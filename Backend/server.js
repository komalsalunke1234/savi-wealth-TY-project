/******************************************************************
 * SAVIWEALTH – BEHAVIORAL INVESTMENT BACKEND v2.0
 * ---------------------------------------------------------------
 * Complete implementation with all modules
 ******************************************************************/

require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const helmet = require("helmet")
const morgan = require("morgan")

const app = express()

/* SECURITY & MIDDLEWARE */
app.use(helmet())
app.use(morgan("combined"))
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* DATABASE CONNECTION */
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "saviwealth",
  waitForConnections: true,
  connectionLimit: 10
})

// Test DB connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message)
  })

/* AUTHENTICATION MIDDLEWARE */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Token required", code: "NO_TOKEN" })
  }

  jwt.verify(token, process.env.JWT_SECRET || "saviwealth_super_secret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token", code: "INVALID_TOKEN" })
    }
    req.user = user
    next()
  })
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required", code: "FORBIDDEN" })
  }
  next()
}

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.json({ message: "SaviWealth Backend Running ✅", version: "2.0.0" })
})

/* ========== AUTH ENDPOINTS ========== */

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required", code: "MISSING_FIELDS" })
    }

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    )

    if (existing.length > 0) {
      return res.status(409).json({ message: "User already exists", code: "USER_EXISTS" })
    }

    const hash = await bcrypt.hash(password, 10)

    const [result] = await pool.execute(
      `INSERT INTO users (fullName, email, phone, passwordHash, role, status, kycStatus)
       VALUES (?, ?, ?, ?, 'user', 'active', 'pending')`,
      [fullName, email, phone, hash]
    )

    const token = jwt.sign(
      { id: result.insertId, role: "user" },
      process.env.JWT_SECRET || "saviwealth_super_secret",
      { expiresIn: "2h" }
    )

    res.status(201).json({ 
      message: "User created successfully ✅",
      token,
      user: { id: result.insertId, fullName, email, role: "user" }
    })
  } catch (err) {
    console.error("Signup Error:", err)
    res.status(500).json({ message: "Server error", code: "SERVER_ERROR" })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required", code: "MISSING_FIELDS" })
    }

    try {
      const [rows] = await pool.execute(
        "SELECT id, fullName, email, passwordHash, role, status FROM users WHERE email = ?",
        [email]
      )

      if (!rows.length) {
        return res.status(401).json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" })
      }

      const user = rows[0]

      if (user.status === "suspended") {
        return res.status(403).json({ message: "Account suspended", code: "ACCOUNT_SUSPENDED" })
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash)
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" })
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "saviwealth_super_secret",
        { expiresIn: "24h" }
      )

      await pool.execute("UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?", [user.id])

      res.json({
        message: "Login successful ✅",
        token,
        user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
      })
    } catch (dbErr) {
      console.error("Database query error:", dbErr.message)
      console.error("Error code:", dbErr.code)
      res.status(500).json({ message: "Server error", code: "SERVER_ERROR", error: dbErr.message })
    }
  } catch (err) {
    console.error("Login Error:", err.message || err)
    console.error("Stack:", err.stack)
    res.status(500).json({ message: "Server error", code: "SERVER_ERROR", error: err.message })
  }
})

// Forgot Password - Reset with email and new password
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required", code: "MISSING_FIELDS" })
    }

    // Check if user exists
    const [users] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    )

    if (!users.length) {
      return res.status(404).json({ message: "User not found with this email", code: "NOT_FOUND" })
    }

    // Hash new password
    const hash = await bcrypt.hash(newPassword, 10)

    // Update user's password
    await pool.execute(
      "UPDATE users SET passwordHash = ? WHERE email = ?",
      [hash, email]
    )

    res.json({ message: "Password reset successfully ✅" })
  } catch (err) {
    console.error("Forgot Password Error:", err)
    res.status(500).json({ message: "Server error", code: "SERVER_ERROR" })
  }
})

// Create Admin User (for testing - remove in production)
app.post("/api/auth/create-admin", async (req, res) => {
  try {
    const { email, password, fullName } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required", code: "MISSING_FIELDS" })
    }

    // Check if user already exists
    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    )

    if (existing.length > 0) {
      // Update existing user to admin
      const hash = await bcrypt.hash(password, 10)
      await pool.execute(
        "UPDATE users SET passwordHash = ?, role = 'admin', status = 'active' WHERE email = ?",
        [hash, email]
      )
      return res.json({ message: "Admin user updated successfully ✅" })
    }

    // Create new admin user
    const hash = await bcrypt.hash(password, 10)
    await pool.execute(
      "INSERT INTO users (fullName, email, phone, passwordHash, role, status, kycStatus, isEmailVerified, isPhoneVerified) VALUES (?, ?, ?, ?, 'admin', 'active', 'verified', TRUE, TRUE)",
      [fullName || 'Admin', email, '+91-9999999999', hash]
    )

    res.json({ message: "Admin user created successfully ✅" })
  } catch (err) {
    console.error("Create Admin Error:", err)
    res.status(500).json({ message: "Server error", code: "SERVER_ERROR" })
  }
})

/* ========== USER PROFILE ENDPOINTS ========== */

app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      `SELECT id, fullName, email, phone, role, status, kycStatus, joinDate, aum FROM users WHERE id = ?`,
      [req.user.id]
    )

    if (!users.length) {
      return res.status(404).json({ message: "User not found", code: "NOT_FOUND" })
    }

    res.json({ user: users[0] })
  } catch (err) {
    console.error("Get Profile Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const { fullName, phone, bio } = req.body

    await pool.execute(
      `UPDATE users SET fullName = ?, phone = ?, bio = ? WHERE id = ?`,
      [fullName || null, phone || null, bio || null, req.user.id]
    )

    res.json({ message: "Profile updated successfully ✅" })
  } catch (err) {
    console.error("Update Profile Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== FINANCIAL PROFILE ENDPOINTS ========== */

app.post("/api/user/financial-profile", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { age, income, portfolio_value, past_loss_percent, panic_history, investmentHorizon, riskTolerance } = req.body

    if (!age || !income || !portfolio_value) {
      return res.status(400).json({ message: "Missing required fields", code: "MISSING_FIELDS" })
    }

    const [existing] = await pool.execute(
      "SELECT id FROM financial_profiles WHERE user_id = ?",
      [user_id]
    )

    if (existing.length > 0) {
      await pool.execute(
        `UPDATE financial_profiles SET age = ?, income = ?, portfolio_value = ?, past_loss_percent = ?,
         panic_history = ?, investmentHorizon = ?, riskTolerance = ? WHERE user_id = ?`,
        [age, income, portfolio_value, past_loss_percent || 0, panic_history || false, investmentHorizon || 'medium', riskTolerance || 'medium', user_id]
      )
    } else {
      await pool.execute(
        `INSERT INTO financial_profiles (user_id, age, income, portfolio_value, past_loss_percent, panic_history, investmentHorizon, riskTolerance)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, age, income, portfolio_value, past_loss_percent || 0, panic_history || false, investmentHorizon || 'medium', riskTolerance || 'medium']
      )
    }

    res.json({ message: "Financial profile saved successfully ✅" })
  } catch (err) {
    console.error("Financial Profile Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/user/financial-profile", authenticateToken, async (req, res) => {
  try {
    const [profile] = await pool.execute(
      "SELECT * FROM financial_profiles WHERE user_id = ?",
      [req.user.id]
    )

    if (!profile.length) {
      return res.status(404).json({ message: "Financial profile not found", code: "NOT_FOUND" })
    }

    res.json({ profile: profile[0] })
  } catch (err) {
    console.error("Get Financial Profile Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== BEHAVIORAL ASSESSMENT ========== */

function calculateBehaviorScores(answers) {
  if (!Array.isArray(answers) || answers.length < 9) {
    throw new Error("Invalid answers array")
  }
  return {
    emotional_score: (answers[0] || 0) + (answers[4] || 0) + (answers[7] || 0),
    risk_score: (answers[2] || 0) + (answers[5] || 0) + (answers[8] || 0),
    financial_score: (answers[1] || 0) + (answers[3] || 0) + (answers[6] || 0),
    horizon: answers[8] || 0
  }
}

async function getMLPrediction(featureVector) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/predict", featureVector)
    return response.data
  } catch (error) {
    console.error("ML Service Error:", error.message)
    return { panic_probability: 0.3, regret_probability: 0.2, model_version: "fallback" }
  }
}

function antiSellEngine(risk_score, panic_probability) {
  let recommendation
  if (risk_score <= 5) recommendation = "Conservative Portfolio"
  else if (risk_score <= 8) recommendation = "Moderate Portfolio"
  else recommendation = "Aggressive Portfolio"

  if (panic_probability > 0.6) {
    recommendation = "Safer Conservative Portfolio (Panic Risk Detected)"
  }
  return recommendation
}

app.post("/api/user/assessment", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { answers } = req.body

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format", code: "INVALID_INPUT" })
    }

    const scores = calculateBehaviorScores(answers)

    const [profiles] = await pool.execute(
      "SELECT * FROM financial_profiles WHERE user_id = ?",
      [user_id]
    )

    if (!profiles.length) {
      return res.status(400).json({ message: "Financial profile missing", code: "PROFILE_MISSING" })
    }

    const financial = profiles[0]

    const mlInput = {
      age: financial.age,
      income: financial.income,
      portfolio_value: financial.portfolio_value,
      emotional_score: scores.emotional_score,
      risk_score: scores.risk_score,
      financial_score: scores.financial_score,
      horizon: scores.horizon,
      past_loss_percent: financial.past_loss_percent,
      panic_history: financial.panic_history
    }

    const mlResult = await getMLPrediction(mlInput)

    const mlOutput = {
      panic_probability: mlResult.panic_probability || 0,
      regret_probability: mlResult.regret_probability || 0
    }

    const recommendation = antiSellEngine(scores.risk_score, mlOutput.panic_probability)

    await pool.execute(
      `INSERT INTO assessments (user_id, emotional_score, risk_score, financial_score, horizon, panic_probability, regret_probability, recommendation)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, scores.emotional_score, scores.risk_score, scores.financial_score, scores.horizon, mlOutput.panic_probability, mlOutput.regret_probability, recommendation]
    )

    res.status(201).json({ message: "Assessment completed ✅", scores, mlOutput, recommendation })
  } catch (err) {
    console.error("Assessment Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/user/assessment", authenticateToken, async (req, res) => {
  try {
    const [assessments] = await pool.execute(
      `SELECT * FROM assessments WHERE user_id = ? ORDER BY createdAt DESC LIMIT 1`,
      [req.user.id]
    )

    if (!assessments.length) {
      return res.status(404).json({ message: "No assessment found", code: "NOT_FOUND" })
    }

    res.json({ assessment: assessments[0] })
  } catch (err) {
    console.error("Get Assessment Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== INVESTMENTS ENDPOINTS ========== */

app.get("/api/investments", async (req, res) => {
  try {
    const { type, riskLevel, status } = req.query
    let query = "SELECT * FROM investments WHERE 1=1"
    const params = []

    if (type) { query += " AND investmentType = ?"; params.push(type) }
    if (riskLevel) { query += " AND riskLevel = ?"; params.push(riskLevel) }
    if (status) { query += " AND status = ?"; params.push(status) }

    const [investments] = await pool.execute(query + " ORDER BY createdAt DESC", params)
    res.json({ investments })
  } catch (err) {
    console.error("Get Investments Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/investments/:investmentId", async (req, res) => {
  try {
    const [investments] = await pool.execute(
      "SELECT * FROM investments WHERE id = ?",
      [req.params.investmentId]
    )

    if (!investments.length) {
      return res.status(404).json({ message: "Investment not found", code: "NOT_FOUND" })
    }

    res.json({ investment: investments[0] })
  } catch (err) {
    console.error("Get Investment Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== PORTFOLIO ENDPOINTS ========== */

app.get("/api/user/portfolio", authenticateToken, async (req, res) => {
  try {
    const [portfolios] = await pool.execute(
      "SELECT * FROM portfolios WHERE user_id = ?",
      [req.user.id]
    )

    if (!portfolios.length) {
      const [create] = await pool.execute(
        `INSERT INTO portfolios (user_id, stocks, mutualFunds, bonds, fixedIncome, insurance, realEstate, others, totalValue)
         VALUES (?, 0, 0, 0, 0, 0, 0, 0, 0)`,
        [req.user.id]
      )
      const [newPort] = await pool.execute("SELECT * FROM portfolios WHERE user_id = ?", [req.user.id])
      const [investments] = await pool.execute(
        `SELECT ui.*, i.name, i.riskLevel FROM user_investments ui
         JOIN investments i ON ui.investment_id = i.id WHERE ui.user_id = ? AND ui.status = 'active'`,
        [req.user.id]
      )
      return res.json({ portfolio: newPort[0], investments })
    }

    const [investments] = await pool.execute(
      `SELECT ui.*, i.name, i.riskLevel FROM user_investments ui
       JOIN investments i ON ui.investment_id = i.id WHERE ui.user_id = ? AND ui.status = 'active'`,
      [req.user.id]
    )

    res.json({ portfolio: portfolios[0], investments })
  } catch (err) {
    console.error("Get Portfolio Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== TRANSACTION ENDPOINTS ========== */

app.post("/api/user/invest", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { investment_id, amount, sipFrequency, sipAmount } = req.body

    if (!investment_id || !amount) {
      return res.status(400).json({ message: "Missing fields", code: "MISSING_FIELDS" })
    }

    const [investments] = await pool.execute(
      "SELECT * FROM investments WHERE id = ?",
      [investment_id]
    )

    if (!investments.length) {
      return res.status(404).json({ message: "Investment not found", code: "NOT_FOUND" })
    }

    const investment = investments[0]

    if (amount < investment.minInvestment) {
      return res.status(400).json({ 
        message: `Minimum investment is ${investment.minInvestment}`,
        code: "AMOUNT_TOO_LOW"
      })
    }

    const [result] = await pool.execute(
      `INSERT INTO transactions (user_id, investment_id, transactionType, amount, transactionStatus, paymentMethod)
       VALUES (?, ?, 'buy', ?, 'success', 'account')`,
      [user_id, investment_id, amount]
    )

    const [existing] = await pool.execute(
      "SELECT id FROM user_investments WHERE user_id = ? AND investment_id = ?",
      [user_id, investment_id]
    )

    if (existing.length > 0) {
      await pool.execute(
        `UPDATE user_investments SET investmentAmount = investmentAmount + ?, units = units + 1
         WHERE user_id = ? AND investment_id = ?`,
        [amount, user_id, investment_id]
      )
    } else {
      await pool.execute(
        `INSERT INTO user_investments (user_id, investment_id, investmentAmount, units, sipFrequency, sipAmount)
         VALUES (?, ?, ?, 1, ?, ?)`,
        [user_id, investment_id, amount, sipFrequency || 'one_time', sipAmount || 0]
      )
    }

    res.status(201).json({ message: "Investment successful ✅", transactionId: result.insertId })
  } catch (err) {
    console.error("Invest Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/user/transactions", authenticateToken, async (req, res) => {
  try {
    const [transactions] = await pool.execute(
      `SELECT t.*, i.name as investmentName FROM transactions t
       LEFT JOIN investments i ON t.investment_id = i.id
       WHERE t.user_id = ? ORDER BY t.transactionDate DESC LIMIT 50`,
      [req.user.id]
    )

    res.json({ transactions })
  } catch (err) {
    console.error("Get Transactions Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== CRASH SIMULATION ========== */

app.post("/api/user/simulate", authenticateToken, async (req, res) => {
  try {
    const { portfolio_value } = req.body

    if (!portfolio_value) {
      return res.status(400).json({ message: "Portfolio value required", code: "MISSING_FIELDS" })
    }

    const simulation = {
      originalValue: portfolio_value,
      crash_10_percent: parseFloat((portfolio_value * 0.9).toFixed(2)),
      crash_20_percent: parseFloat((portfolio_value * 0.8).toFixed(2)),
      crash_30_percent: parseFloat((portfolio_value * 0.7).toFixed(2)),
      crash_50_percent: parseFloat((portfolio_value * 0.5).toFixed(2))
    }

    await pool.execute(
      `INSERT INTO crash_simulations (user_id, portfolioValue) VALUES (?, ?)`,
      [req.user.id, portfolio_value]
    )

    res.json({ message: "Crash simulation completed ✅", simulation })
  } catch (err) {
    console.error("Crash Simulation Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== ADMIN ENDPOINTS ========== */

app.get("/api/admin/analytics", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [[users]] = await pool.execute("SELECT COUNT(*) as total FROM users WHERE role = 'user'")
    const [[riskAvg]] = await pool.execute("SELECT COALESCE(AVG(risk_score), 0) as avgRisk FROM assessments")
    const [[panicAvg]] = await pool.execute("SELECT COALESCE(AVG(panic_probability), 0) as avgPanic FROM assessments")
    const [[investments]] = await pool.execute("SELECT COUNT(*) as total FROM user_investments WHERE status = 'active'")
    const [[transactions]] = await pool.execute("SELECT COUNT(*) as total FROM transactions WHERE transactionStatus = 'success'")
    const [[aum]] = await pool.execute("SELECT COALESCE(SUM(totalValue), 0) as total FROM portfolios")

    res.json({
      total_users: users.total,
      total_investments: investments.total,
      average_risk_score: parseFloat(riskAvg.avgRisk).toFixed(2),
      average_panic_probability: parseFloat(panicAvg.avgPanic).toFixed(4),
      successful_transactions: transactions.total,
      total_aum: parseFloat(aum.total).toFixed(2)
    })
  } catch (err) {
    console.error("Admin Analytics Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/users", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { status, kycStatus } = req.query
    let query = "SELECT id, fullName, email, phone, status, kycStatus, joinDate, aum, investmentCount FROM users WHERE role = 'user'"
    const params = []

    if (status) { query += " AND status = ?"; params.push(status) }
    if (kycStatus) { query += " AND kycStatus = ?"; params.push(kycStatus) }

    const [users] = await pool.execute(query + " ORDER BY joinDate DESC LIMIT 100", params)
    res.json({ users })
  } catch (err) {
    console.error("Get Users Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/transactions", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [[count]] = await pool.execute("SELECT COUNT(*) as total FROM transactions")
    const [transactions] = await pool.execute(
      `SELECT t.*, i.name as investmentName, u.fullName as userName FROM transactions t
       LEFT JOIN investments i ON t.investment_id = i.id
       LEFT JOIN users u ON t.user_id = u.id
       ORDER BY t.transactionDate DESC LIMIT 100`
    )

    res.json({ total: count.total, transactions })
  } catch (err) {
    console.error("Get Transactions Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* ========== ADDITIONAL ADMIN ENDPOINTS ========== */

app.put("/api/admin/users/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { fullName, email, phone, status, kycStatus, role } = req.body

    await pool.execute(
      `UPDATE users SET fullName = ?, email = ?, phone = ?, status = ?, kycStatus = ?, role = ? WHERE id = ?`,
      [fullName, email, phone, status, kycStatus, role, id]
    )

    res.json({ message: "User updated successfully ✅" })
  } catch (err) {
    console.error("Update User Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/api/admin/users/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await pool.execute("DELETE FROM users WHERE id = ?", [id])

    res.json({ message: "User deleted successfully ✅" })
  } catch (err) {
    console.error("Delete User Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/advisors", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [advisors] = await pool.execute(
      `SELECT a.*, u.fullName, u.email, u.phone FROM advisors a
       JOIN users u ON a.user_id = u.id
       ORDER BY a.createdAt DESC`
    )

    res.json({ advisors })
  } catch (err) {
    console.error("Get Advisors Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/admin/advisors", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { fullName, email, phone, expertise, yearsOfExperience, bio } = req.body

    const hash = await bcrypt.hash("advisor123", 10) // Default password

    const [userResult] = await pool.execute(
      `INSERT INTO users (fullName, email, phone, passwordHash, role, status, kycStatus)
       VALUES (?, ?, ?, ?, 'advisor', 'active', 'verified')`,
      [fullName, email, phone, hash]
    )

    await pool.execute(
      `INSERT INTO advisors (user_id, expertise, yearsOfExperience, bio, isVerified)
       VALUES (?, ?, ?, ?, TRUE)`,
      [userResult.insertId, JSON.stringify(expertise), yearsOfExperience, bio]
    )

    res.status(201).json({ message: "Advisor created successfully ✅" })
  } catch (err) {
    console.error("Create Advisor Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/admin/advisors/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { fullName, email, phone, expertise, yearsOfExperience, bio, isVerified } = req.body

    await pool.execute(
      `UPDATE users SET fullName = ?, email = ?, phone = ? WHERE id = ?`,
      [fullName, email, phone, id]
    )

    await pool.execute(
      `UPDATE advisors SET expertise = ?, yearsOfExperience = ?, bio = ?, isVerified = ? WHERE user_id = ?`,
      [JSON.stringify(expertise), yearsOfExperience, bio, isVerified, id]
    )

    res.json({ message: "Advisor updated successfully ✅" })
  } catch (err) {
    console.error("Update Advisor Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/api/admin/advisors/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await pool.execute("DELETE FROM advisors WHERE user_id = ?", [id])
    await pool.execute("DELETE FROM users WHERE id = ?", [id])

    res.json({ message: "Advisor deleted successfully ✅" })
  } catch (err) {
    console.error("Delete Advisor Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/investments", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [investments] = await pool.execute(
      "SELECT * FROM investments ORDER BY createdAt DESC"
    )

    res.json({ investments })
  } catch (err) {
    console.error("Get Investments Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/admin/investments", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, description, riskLevel, expectedReturn, minInvestment, investmentType } = req.body

    const [result] = await pool.execute(
      `INSERT INTO investments (name, description, riskLevel, expectedReturn, status, minInvestment, investmentType)
       VALUES (?, ?, ?, ?, 'active', ?, ?)`,
      [name, description, riskLevel, expectedReturn, minInvestment, investmentType]
    )

    res.status(201).json({ message: "Investment created successfully ✅", id: result.insertId })
  } catch (err) {
    console.error("Create Investment Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/admin/investments/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, riskLevel, expectedReturn, status, minInvestment, investmentType } = req.body

    await pool.execute(
      `UPDATE investments SET name = ?, description = ?, riskLevel = ?, expectedReturn = ?, status = ?, minInvestment = ?, investmentType = ? WHERE id = ?`,
      [name, description, riskLevel, expectedReturn, status, minInvestment, investmentType, id]
    )

    res.json({ message: "Investment updated successfully ✅" })
  } catch (err) {
    console.error("Update Investment Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/api/admin/investments/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await pool.execute("DELETE FROM investments WHERE id = ?", [id])

    res.json({ message: "Investment deleted successfully ✅" })
  } catch (err) {
    console.error("Delete Investment Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/portfolios", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [portfolios] = await pool.execute(
      `SELECT p.*, u.fullName as userName FROM portfolios p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.createdAt DESC`
    )

    res.json({ portfolios })
  } catch (err) {
    console.error("Get Portfolios Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/notifications", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [notifications] = await pool.execute(
      "SELECT * FROM notifications ORDER BY createdAt DESC LIMIT 100"
    )

    res.json({ notifications })
  } catch (err) {
    console.error("Get Notifications Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/admin/notifications", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { user_id, title, message, notificationType } = req.body

    const [result] = await pool.execute(
      `INSERT INTO notifications (user_id, title, message, notificationType)
       VALUES (?, ?, ?, ?)`,
      [user_id, title, message, notificationType]
    )

    res.status(201).json({ message: "Notification created successfully ✅", id: result.insertId })
  } catch (err) {
    console.error("Create Notification Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/admin/notifications/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { title, message, notificationType, isRead } = req.body

    await pool.execute(
      `UPDATE notifications SET title = ?, message = ?, notificationType = ?, isRead = ? WHERE id = ?`,
      [title, message, notificationType, isRead, id]
    )

    res.json({ message: "Notification updated successfully ✅" })
  } catch (err) {
    console.error("Update Notification Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/api/admin/notifications/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await pool.execute("DELETE FROM notifications WHERE id = ?", [id])

    res.json({ message: "Notification deleted successfully ✅" })
  } catch (err) {
    console.error("Delete Notification Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/settings", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [settings] = await pool.execute("SELECT * FROM settings")

    res.json({ settings })
  } catch (err) {
    console.error("Get Settings Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/admin/settings/:key", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { key } = req.params
    const { settingValue, description } = req.body

    await pool.execute(
      `INSERT INTO settings (settingKey, settingValue, description) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue), description = VALUES(description)`,
      [key, settingValue, description]
    )

    res.json({ message: "Setting updated successfully ✅" })
  } catch (err) {
    console.error("Update Setting Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/reports", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    // Basic reports - can be expanded
    const [[userStats]] = await pool.execute("SELECT COUNT(*) as totalUsers FROM users WHERE role = 'user'")
    const [[investmentStats]] = await pool.execute("SELECT COUNT(*) as totalInvestments FROM user_investments WHERE status = 'active'")
    const [[transactionStats]] = await pool.execute("SELECT COUNT(*) as totalTransactions FROM transactions WHERE transactionStatus = 'success'")
    const [[aumStats]] = await pool.execute("SELECT SUM(totalValue) as totalAUM FROM portfolios")

    res.json({
      userStats,
      investmentStats,
      transactionStats,
      aumStats
    })
  } catch (err) {
    console.error("Get Reports Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

/* SERVER START */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 SaviWealth Backend running on port ${PORT}`)
})

module.exports = app
