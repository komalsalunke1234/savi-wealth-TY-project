/******************************************************************

* SAVIWEALTH BACKEND (FINAL PRODUCTION VERSION)
* ---
* Supports:
* ✅ User App (Auth, Profile, Investments, ML Assessment)
* ✅ Admin Panel (Dashboard, Users, Transactions, Advisors, etc.)
* ✅ ML Integration (FastAPI)

* DO NOT REMOVE ANYTHING → Frontend depends on these APIs
  ******************************************************************/

/* ================= ENV CONFIG ================= */
require("dotenv").config();

if (!process.env.DB_PASSWORD) {
console.error("❌ DB_PASSWORD missing in .env");
process.exit(1);
}

/* ================= IMPORTS ================= */
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

/* ================= MIDDLEWARE ================= */
/**

* Used by:
* * ALL frontend requests (Admin + User)
    */
    app.use(helmet());
    app.use(morgan("dev"));
   app.use(cors({
     origin: true,
     credentials: true
      }));
    app.use(express.json());

/* ================= DATABASE ================= */
/**

* Used by:
* * All APIs (User + Admin)
    */
    const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "saviwealth",
    waitForConnections: true,
    connectionLimit: 10
    });

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
    conn.release();
  } catch (err) {
    console.error("❌ DATABASE CONNECTION FAILED:", err.message);
  }
})();
/* ================= AUTH ================= */
/**

* Used by:
* * All protected routes
    */
    function authenticateToken(req, res, next) {
    try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token required" });

  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
  } catch {
  return res.status(403).json({ message: "Invalid token" });
  }
  }

/**

* Used by:
* * Admin panel only
    */
    function authorizeAdmin(req, res, next) {
    if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
    }
    next();
    }

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
res.json({ message: "SaviWealth Backend Running ✅" });
});

/* ================= ML INTEGRATION ================= */
/**

* Used by:
* * Assessment Feature (User App)
    */
    async function getMLPrediction(data) {
    try {
    const res = await axios.post(
    "http://127.0.0.1:8000/predict",
    data,
    { timeout: 3000 }
    );
    return res.data;
    } catch (err) {
    console.error("⚠️ ML ERROR:", err.message);
    return { panic_probability: 0.3 };
    }
    }

/* ================= AUTH ROUTES ================= */
/**

* Used by:
* * Login / Signup screens
    */
    app.post("/api/auth/signup", async (req, res) => {
    try {
    const { fullName, email, phone, password } = req.body;

  const [existing] = await pool.execute(
  "SELECT id FROM users WHERE email = ?",
  [email]
  );

  if (existing.length)
  return res.status(409).json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const [result] = await pool.execute(
  `INSERT INTO users (fullName,email,phone,passwordHash,role,status,kycStatus)
      VALUES (?, ?, ?, ?, 'user','active','pending')`,
  [fullName, email, phone, hash]
  );

  const token = jwt.sign(
  { id: result.insertId, role: "user" },
  process.env.JWT_SECRET,
  { expiresIn: "2h" }
  );

  res.status(201).json({ message: "User created", token });

} catch (err) {
res.status(500).json({ message: "Server error" });
}
});
/******************************************************************
 * LOGIN ROUTE (USED BY: Login Page - User + Admin)
 ******************************************************************/
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "saviwealth_super_secret",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/create-admin", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users (fullName,email,phone,passwordHash,role,status,kycStatus)
       VALUES (?, ?, ?, ?, 'admin','active','verified')`,
      [fullName, email, phone, hash]
    );

    res.json({ message: "Admin created ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= USER PROFILE ================= */
/**

* Used by:
* * User Dashboard
    */
    app.get("/api/user/profile", authenticateToken, async (req, res) => {
    const [user] = await pool.execute(
    "SELECT * FROM users WHERE id = ?",
    [req.user.id]
    );
    res.json(user[0]);
    });

/* ================= ASSESSMENT (ML FEATURE) ================= */
/**

* Used by:
* * Behavioral assessment page
* * ML prediction integration
    */
    app.post("/api/user/assessment", authenticateToken, async (req, res) => {
    try {
    const { answers } = req.body;

  const scores = {
  emotional_score: answers[0] + answers[4],
  risk_score: answers[2] + answers[5],
  financial_score: answers[1] + answers[3]
  };

  const ml = await getMLPrediction(scores);

  res.json({
  message: "Assessment done",
  scores,
  ml
  });

} catch {
res.status(500).json({ message: "Error in assessment" });
}
});

/* ================= ADMIN DASHBOARD ================= */
/**

* Used by:
* * Admin Dashboard page (IMPORTANT)
    */
    app.get("/api/admin/dashboard", authenticateToken, authorizeAdmin, async (req, res) => {
    try {
    const [[users]] = await pool.execute("SELECT COUNT(*) as total FROM users");
    const [[aum]] = await pool.execute("SELECT SUM(totalValue) as total FROM portfolios");
    const [[transactions]] = await pool.execute("SELECT COUNT(*) as total FROM transactions");

  res.json({
  totalUsers: users.total || 0,
  totalAUM: aum.total || 0,
  totalTransactions: transactions.total || 0
  });

} catch (err) {
res.status(500).json({ error: err.message });
}
});

/* ================= ADMIN USERS ================= */
/**

* Used by:
* * Users page in Admin Panel
    */
    app.get("/api/admin/users", authenticateToken, authorizeAdmin, async (req, res) => {
    const [users] = await pool.execute("SELECT * FROM users");
    res.json(users);
    });

/* ================= ADMIN TRANSACTIONS ================= */
/**

* Used by:
* * Transactions page
    */
    app.get("/api/admin/transactions", authenticateToken, authorizeAdmin, async (req, res) => {
    const [data] = await pool.execute("SELECT * FROM transactions");
    res.json(data);
    });

app.get("/api/investments", async (req, res) => {
  try {
    const [data] = await pool.execute("SELECT * FROM investments");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});    
/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
