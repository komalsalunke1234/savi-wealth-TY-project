/**
 * SaviWealth User API Service
 * Handles all API calls to the backend for user dashboard and features
 */

const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:5000";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  token?: string;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, token } = options;

  const headers: any = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // Handle non-JSON responses
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server error: Unable to connect to backend. Please ensure the server is running.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (error: any) {
    console.error("API Error:", error);
    if (error.message.includes("Unable to connect")) {
      throw error;
    }
    throw new Error(error.message || "Network error. Please check if backend is running.");
  }
}

// ========== Authentication ==========

export async function signup(fullName: string, email: string, phone: string, password: string) {
  return apiCall("/api/auth/signup", {
    method: "POST",
    body: { fullName, email, phone, password },
  });
}

export async function login(email: string, password: string) {
  return apiCall("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function forgotPassword(email: string, newPassword: string) {
  return apiCall("/api/auth/forgot-password", {
    method: "POST",
    body: { email, newPassword },
  });
}

// ========== User Profile ==========

export async function getUserProfile(token: string) {
  return apiCall("/api/user/profile", { token });
}

export async function updateUserProfile(token: string, data: any) {
  return apiCall("/api/user/profile", {
    method: "PUT",
    body: data,
    token,
  });
}

// ========== Financial Profile ==========

export async function submitFinancialProfile(token: string, data: any) {
  return apiCall("/api/user/financial-profile", {
    method: "POST",
    body: data,
    token,
  });
}

export async function getFinancialProfile(token: string) {
  return apiCall("/api/user/financial-profile", { token });
}

// ========== Behavioral Assessment ==========

export async function submitAssessment(token: string, answers: number[]) {
  return apiCall("/api/user/assessment", {
    method: "POST",
    body: { answers },
    token,
  });
}

export async function getLatestAssessment(token: string) {
  return apiCall("/api/user/assessment", { token });
}

// ========== Admin APIs ==========

export async function getAdminAnalytics(token: string) {
  return apiCall("/api/admin/analytics", { token });
}

export async function getAdminUsers(token: string, filters?: any) {
  let endpoint = "/api/admin/users";
  if (filters) {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.kycStatus) params.append("kycStatus", filters.kycStatus);
    endpoint += `?${params.toString()}`;
  }
  return apiCall(endpoint, { token });
}

export async function getAdminTransactions(token: string) {
  return apiCall("/api/admin/transactions", { token });
}

export async function getInvestments(filters?: any) {
  let endpoint = "/api/investments";
  if (filters) {
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);
    if (filters.riskLevel) params.append("riskLevel", filters.riskLevel);
    if (filters.status) params.append("status", filters.status);
    endpoint += `?${params.toString()}`;
  }
  return apiCall(endpoint);
}

export async function createInvestment(token: string, data: any) {
  return apiCall("/api/admin/investments", {
    method: "POST",
    body: data,
    token,
  });
}

export async function getAdminUserPortfolio(token: string, userId: string) {
  return apiCall(`/api/admin/portfolios/${userId}`, { token });
}

export async function getAdminAdvisors(token: string) {
  return apiCall("/api/admin/advisors", { token });
}

export async function getAdminNotifications(token: string) {
  return apiCall("/api/admin/notifications", { token });
}

export async function getAdminPortfolios(token: string) {
  return apiCall("/api/admin/portfolios", { token });
}

export async function getAdminReports(token: string) {
  return apiCall("/api/admin/reports", { token });
}

// ========== Portfolio ==========

export async function getUserPortfolio(token: string) {
  return apiCall("/api/user/portfolio", { token });
}

export async function getInvestmentDetails(investmentId: string) {
  return apiCall(`/api/investments/${investmentId}`);
}

// ========== Transactions ==========

export async function investInProduct(token: string, data: any) {
  return apiCall("/api/user/invest", {
    method: "POST",
    body: data,
    token,
  });
}

export async function getUserTransactions(token: string) {
  return apiCall("/api/user/transactions", { token });
}

// ========== Crash Simulation ==========

export async function runCrashSimulation(token: string, portfolio_value: number) {
  return apiCall("/api/user/simulate", {
    method: "POST",
    body: { portfolio_value },
    token,
  });
}

export default {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  submitFinancialProfile,
  getFinancialProfile,
  submitAssessment,
  getLatestAssessment,
  getUserPortfolio,
  getInvestments,
  getInvestmentDetails,
  investInProduct,
  getUserTransactions,
  runCrashSimulation,
};
