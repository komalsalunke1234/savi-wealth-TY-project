-- =====================================================
-- SAVIWEALTH DATABASE SCHEMA
-- Complete MySQL Schema for SaviWealth Platform
-- =====================================================

-- User Role Enum: 'user', 'admin', 'advisor'
-- Status Enum: 'active', 'inactive', 'suspended'
-- KYC Status Enum: 'verified', 'pending', 'rejected'

CREATE DATABASE IF NOT EXISTS saviwealth;
USE saviwealth;

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'advisor') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    kycStatus ENUM('verified', 'pending', 'rejected') DEFAULT 'pending',
    joinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP NULL,
    isEmailVerified BOOLEAN DEFAULT FALSE,
    isPhoneVerified BOOLEAN DEFAULT FALSE,
    aum DECIMAL(15, 2) DEFAULT 0.00,
    investmentCount INT DEFAULT 0,
    profilePicture VARCHAR(255) NULL,
    bio TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_kycStatus (kycStatus)
);

-- =====================================================
-- 2. FINANCIAL PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS financial_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    age INT NOT NULL,
    income DECIMAL(15, 2) NOT NULL,
    portfolio_value DECIMAL(15, 2) NOT NULL,
    past_loss_percent DECIMAL(5, 2) DEFAULT 0.00,
    panic_history BOOLEAN DEFAULT FALSE,
    investmentHorizon ENUM('short', 'medium', 'long') DEFAULT 'medium',
    riskTolerance ENUM('low', 'medium', 'high') DEFAULT 'medium',
    monthlyInvestmentCapacity DECIMAL(15, 2) DEFAULT 0.00,
    existingInvestments TEXT NULL,
    financialGoals TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- 3. ASSESSMENTS TABLE
-- Behavioral Assessment Results
-- =====================================================
CREATE TABLE IF NOT EXISTS assessments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    emotional_score INT DEFAULT 0,
    risk_score INT DEFAULT 0,
    financial_score INT DEFAULT 0,
    horizon INT DEFAULT 0,
    panic_probability DECIMAL(5, 4) DEFAULT 0.0000,
    regret_probability DECIMAL(5, 4) DEFAULT 0.0000,
    recommendation VARCHAR(255) NULL,
    assessmentStatus ENUM('pending', 'completed', 'reviewed') DEFAULT 'completed',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_createdAt (createdAt)
);

-- =====================================================
-- 4. INVESTMENTS TABLE
-- Available Investment Products
-- =====================================================
CREATE TABLE IF NOT EXISTS investments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    riskLevel ENUM('low', 'medium', 'high') NOT NULL,
    expectedReturn DECIMAL(5, 2) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    minInvestment DECIMAL(15, 2) NOT NULL,
    investorCount INT DEFAULT 0,
    totalInvested DECIMAL(15, 2) DEFAULT 0.00,
    investmentType ENUM('mutual_fund', 'equity', 'bonds', 'fixed_income', 'insurance', 'real_estate', 'pms') NOT NULL,
    currentNAV DECIMAL(10, 4) NULL,
    yearlyReturn DECIMAL(5, 2) NULL,
    rating DECIMAL(3, 2) NULL,
    fundManager VARCHAR(255) NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_riskLevel (riskLevel),
    INDEX idx_status (status),
    INDEX idx_investmentType (investmentType)
);

-- =====================================================
-- 5. PORTFOLIOS TABLE
-- User Investment Portfolios
-- =====================================================
CREATE TABLE IF NOT EXISTS portfolios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    stocks DECIMAL(5, 2) DEFAULT 0.00,
    mutualFunds DECIMAL(5, 2) DEFAULT 0.00,
    bonds DECIMAL(5, 2) DEFAULT 0.00,
    fixedIncome DECIMAL(5, 2) DEFAULT 0.00,
    insurance DECIMAL(5, 2) DEFAULT 0.00,
    realEstate DECIMAL(5, 2) DEFAULT 0.00,
    others DECIMAL(5, 2) DEFAULT 0.00,
    totalValue DECIMAL(15, 2) DEFAULT 0.00,
    monthlyReturn DECIMAL(5, 2) DEFAULT 0.00,
    yearlyReturn DECIMAL(5, 2) DEFAULT 0.00,
    lastRebalanceDate TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- 6. USER_INVESTMENTS TABLE
-- Mapping between users and their investments
-- =====================================================
CREATE TABLE IF NOT EXISTS user_investments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    investment_id INT NOT NULL,
    investmentAmount DECIMAL(15, 2) NOT NULL,
    units INT DEFAULT 0,
    purchasePrice DECIMAL(10, 4) NULL,
    currentPrice DECIMAL(10, 4) NULL,
    currentValue DECIMAL(15, 2) GENERATED ALWAYS AS (units * currentPrice) STORED,
    investmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'matured', 'exited') DEFAULT 'active',
    sipFrequency ENUM('monthly', 'quarterly', 'half_yearly', 'yearly', 'one_time') DEFAULT 'one_time',
    sipAmount DECIMAL(15, 2) NULL,
    nextSIPDate DATE NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (investment_id) REFERENCES investments(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_investment_id (investment_id),
    INDEX idx_status (status),
    UNIQUE KEY unique_user_investment (user_id, investment_id)
);

-- =====================================================
-- 7. TRANSACTIONS TABLE
-- All User Transactions
-- =====================================================
CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    investment_id INT NULL,
    transactionType ENUM('buy', 'sell', 'deposit', 'withdrawal', 'dividend', 'interest', 'rebalance') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    quantity DECIMAL(10, 4) NULL,
    pricePerUnit DECIMAL(10, 4) NULL,
    charges DECIMAL(15, 2) DEFAULT 0.00,
    netAmount DECIMAL(15, 2) GENERATED ALWAYS AS (amount - charges) STORED,
    transactionStatus ENUM('success', 'pending', 'failed') DEFAULT 'pending',
    paymentMethod VARCHAR(100) NULL,
    referenceNumber VARCHAR(100) NULL,
    remarks TEXT NULL,
    transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completionDate TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (investment_id) REFERENCES investments(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_transactionType (transactionType),
    INDEX idx_status (transactionStatus),
    INDEX idx_transactionDate (transactionDate)
);

-- =====================================================
-- 8. ADVISORS TABLE
-- Financial Advisors
-- =====================================================
CREATE TABLE IF NOT EXISTS advisors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    expertise JSON NOT NULL,
    assignedClients INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    totalReviews INT DEFAULT 0,
    yearsOfExperience INT DEFAULT 0,
    certifications JSON NULL,
    bio TEXT NULL,
    officeLocation VARCHAR(255) NULL,
    consultationFee DECIMAL(10, 2) NULL,
    isVerified BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- 9. ADVISOR_CLIENTS TABLE
-- Mapping between advisors and their clients
-- =====================================================
CREATE TABLE IF NOT EXISTS advisor_clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    advisor_id INT NOT NULL,
    client_id INT NOT NULL,
    assignedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active',
    notes TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (advisor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_advisor_id (advisor_id),
    INDEX idx_client_id (client_id),
    UNIQUE KEY unique_advisor_client (advisor_id, client_id)
);

-- =====================================================
-- 10. MODEL_LOGS TABLE
-- ML Model Prediction Logs
-- =====================================================
CREATE TABLE IF NOT EXISTS model_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    panic_probability DECIMAL(5, 4) DEFAULT 0.0000,
    regret_probability DECIMAL(5, 4) DEFAULT 0.0000,
    model_version VARCHAR(50) DEFAULT 'v1.0_rf',
    inputFeatures JSON NULL,
    predictionResult JSON NULL,
    executionTime INT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_createdAt (createdAt)
);

-- =====================================================
-- 11. CRASH_SIMULATIONS TABLE
-- Market Crash Simulation Records
-- =====================================================
CREATE TABLE IF NOT EXISTS crash_simulations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    portfolioValue DECIMAL(15, 2) NOT NULL,
    crash10Percent DECIMAL(15, 2) GENERATED ALWAYS AS (portfolioValue * 0.9) STORED,
    crash20Percent DECIMAL(15, 2) GENERATED ALWAYS AS (portfolioValue * 0.8) STORED,
    crash30Percent DECIMAL(15, 2) GENERATED ALWAYS AS (portfolioValue * 0.7) STORED,
    panicRisk DECIMAL(5, 4) NULL,
    recommendation VARCHAR(255) NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_createdAt (createdAt)
);

-- =====================================================
-- 12. NOTIFICATIONS TABLE
-- System Notifications
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notificationType ENUM('info', 'success', 'warning', 'danger') DEFAULT 'info',
    isRead BOOLEAN DEFAULT FALSE,
    readAt TIMESTAMP NULL,
    relatedTo VARCHAR(100) NULL,
    relatedId INT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_isRead (isRead),
    INDEX idx_createdAt (createdAt)
);

-- =====================================================
-- 13. ARTICLES TABLE
-- Blog Articles and Resources
-- =====================================================
CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content LONGTEXT NOT NULL,
    excerpt TEXT NULL,
    category VARCHAR(100) NULL,
    author_id INT NULL,
    coverImage VARCHAR(255) NULL,
    readTime INT DEFAULT 5,
    viewCount INT DEFAULT 0,
    isPublished BOOLEAN DEFAULT TRUE,
    publishedAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_isPublished (isPublished),
    INDEX idx_category (category)
);

-- =====================================================
-- 14. KYC DOCUMENTS TABLE
-- User KYC Documentation
-- =====================================================
CREATE TABLE IF NOT EXISTS kyc_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    documentType ENUM('pan', 'aadhar', 'passport', 'driving_license', 'address_proof') NOT NULL,
    documentNumber VARCHAR(100) NOT NULL,
    documentUrl VARCHAR(255) NULL,
    verificationStatus ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    verifiedBy INT NULL,
    verificationDate TIMESTAMP NULL,
    expiryDate DATE NULL,
    remarks TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (verifiedBy) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_verificationStatus (verificationStatus),
    UNIQUE KEY unique_user_doctype (user_id, documentType)
);

-- =====================================================
-- 15. CONTACT_SUBMISSIONS TABLE
-- Contact Form Submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    subject VARCHAR(255) NOT NULL,
    message LONGTEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    assignedTo INT NULL,
    response TEXT NULL,
    responseDate TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assignedTo) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_createdAt (createdAt)
);

-- =====================================================
-- 16. CONSULTATION_BOOKINGS TABLE
-- Advisor Consultation Bookings
-- =====================================================
CREATE TABLE IF NOT EXISTS consultation_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    advisor_id INT NOT NULL,
    consultationType ENUM('initial', 'portfolio_review', 'planning', 'tax_planning', 'other') NOT NULL,
    scheduledDate DATETIME NOT NULL,
    duration INT DEFAULT 60,
    consultationMode ENUM('call', 'video', 'in_person') DEFAULT 'call',
    status ENUM('scheduled', 'completed', 'cancelled', 'rescheduled') DEFAULT 'scheduled',
    notes TEXT NULL,
    meetingLink VARCHAR(255) NULL,
    feedback DECIMAL(3, 2) NULL,
    feedbackComments TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (advisor_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_client_id (client_id),
    INDEX idx_advisor_id (advisor_id),
    INDEX idx_status (status),
    INDEX idx_scheduledDate (scheduledDate)
);

-- =====================================================
-- 17. AUDIT_LOG TABLE
-- System Audit Trail
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    action VARCHAR(255) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resourceId INT NULL,
    beforeData JSON NULL,
    afterData JSON NULL,
    ipAddress VARCHAR(45) NULL,
    userAgent VARCHAR(500) NULL,
    status ENUM('success', 'failure') DEFAULT 'success',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_resource (resource),
    INDEX idx_createdAt (createdAt)
);

-- =====================================================
-- 18. SETTINGS TABLE
-- Platform Settings
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    settingKey VARCHAR(255) NOT NULL UNIQUE,
    settingValue LONGTEXT NOT NULL,
    description TEXT NULL,
    isPublic BOOLEAN DEFAULT FALSE,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_settingKey (settingKey)
);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Password Reset OTPs Table
CREATE TABLE IF NOT EXISTS password_reset_otps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    expiresAt DATETIME NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Insert Admin User
INSERT INTO users (fullName, email, phone, passwordHash, role, status, kycStatus, isEmailVerified, isPhoneVerified)
VALUES (
    'Admin User',
    'admin@saviwealth.com',
    '+91-9999999999',
    '$2b$10$kT3vg7qWjGzfclOHy2idR.Mnj7LyTWQMsRVD.OqPcuLmP/4PmmmKYm',
    'admin',
    'active',
    'verified',
    TRUE,
    TRUE
);

-- Insert Sample Investments
INSERT INTO investments (name, description, riskLevel, expectedReturn, status, minInvestment, investmentType)
VALUES
('Growth Equity Fund', 'Aggressive equity-focused mutual fund', 'high', 18.00, 'active', 10000.00, 'mutual_fund'),
('Balanced Portfolio', 'Mixed equity and debt portfolio', 'medium', 12.00, 'active', 5000.00, 'mutual_fund'),
('Fixed Income Security', 'Government and corporate bonds', 'low', 7.00, 'active', 1000.00, 'bonds'),
('Index Fund Plus', 'Nifty 50 index tracking fund', 'medium', 14.00, 'active', 5000.00, 'mutual_fund'),
('Corporate Bonds', 'High-grade corporate debt instruments', 'low', 8.00, 'inactive', 50000.00, 'bonds'),
('PMS Portfolio', 'Actively managed portfolio service', 'high', 16.00, 'active', 100000.00, 'pms'),
('Term Insurance Plan', 'Pure risk life insurance coverage', 'low', 12.00, 'active', 5000.00, 'insurance'),
('Real Estate Investment Trust', 'Commercial real estate fund', 'medium', 13.50, 'active', 25000.00, 'real_estate');

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_user_created ON users(createdAt);
CREATE INDEX idx_transaction_user_date ON transactions(user_id, transactionDate);
CREATE INDEX idx_portfolio_value ON portfolios(totalValue);
CREATE INDEX idx_investment_status ON investments(status);
CREATE INDEX idx_notification_user_read ON notifications(user_id, isRead);
