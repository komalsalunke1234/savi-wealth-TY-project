const API_BASE =  "http://localhost:5000";

interface ApiResponse<T = unknown> {
  [key: string]: T;
}

interface ApiError {
  message: string;
}

async function apiCall<T = unknown>(
  endpoint: string,
  method: string = "GET",
  body?: Record<string, unknown>,
  token?: string
): Promise<T> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    console.log("API CALL:", endpoint, res.status);

    const data: ApiResponse<T> = await res.json();

    if (!res.ok) throw new Error((data as unknown as ApiError).message || "API Error");

    return data as T;
  } catch (err) {
    console.error("FETCH ERROR:", err);
    throw err;
  }
}

/* AUTH */
export const adminLogin = (email: string, password: string) =>
apiCall("/api/auth/login", "POST", { email, password });

/* DASHBOARD */
export const getAdminAnalytics = (token: string) =>
apiCall("/api/admin/dashboard", "GET", undefined, token);

/* USERS */
export const getAdminUsers = (token: string) =>
apiCall("/api/admin/users", "GET", undefined, token);

/* TRANSACTIONS */
export const getAdminTransactions = (token: string) =>
apiCall("/api/admin/transactions", "GET", undefined, token);

/* INVESTMENTS */
export const getInvestments = () =>
apiCall("/api/investments");

/* ADVISORS - Mock for now */
export const getAdminAdvisors = (_token?: string) =>
  Promise.resolve([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+91-9876543210",
      specialization: "Portfolio Management",
      experience: 8,
      clients: 45,
      rating: 4.8
    }
  ]);

/* NOTIFICATIONS - Mock for now */
export const getAdminNotifications = (_token?: string) =>
  Promise.resolve([
    {
      id: 1,
      title: "New User Registration",
      message: "A new user has registered",
      type: "info",
      date: new Date().toISOString(),
      read: false
    }
  ]);

/* PORTFOLIOS - Mock for now */
export const getAdminPortfolios = (_token?: string) =>
  Promise.resolve([
    {
      userName: "John Doe",
      stocks: 40,
      mutualFunds: 30,
      bonds: 20,
      totalValue: 5000000,
      monthlyReturn: 2.5
    }
  ]);

/* REPORTS - Mock for now */
export const getAdminReports = (_token?: string) =>
  Promise.resolve({
    totalReports: 25,
    monthlyGrowth: 12.5,
    topPerformers: []
  });

/* EXPORT */
export default {
adminLogin,
getAdminAnalytics,
getAdminUsers,
getAdminTransactions,
getInvestments,
getAdminAdvisors,
getAdminNotifications,
getAdminPortfolios,
getAdminReports,
};

