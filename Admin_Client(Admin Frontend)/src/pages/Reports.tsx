import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import { Card, Button } from '../components/common';
import { getAdminReports, getAdminAnalytics } from '../services/api';

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<any>({});
  const [analytics, setAnalytics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Missing token');

        const reportsRes = await getAdminReports(token);
        const analyticsRes = await getAdminAnalytics(token);

        console.log("REPORTS:", reportsRes);
        console.log("ANALYTICS:", analyticsRes);

        // ✅ SAFE STRUCTURE
        setReports(reportsRes || {});
        setAnalytics(analyticsRes || {});

        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load report data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= FALLBACK DATA ================= */

  const userGrowthData = analytics?.userGrowth || [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 350 },
    { month: 'Mar', users: 500 },
    { month: 'Apr', users: 800 },
    { month: 'May', users: 1200 },
  ];

  const revenueData = analytics?.revenue || [
    { month: 'Jan', revenue: 200 },
    { month: 'Feb', revenue: 400 },
    { month: 'Mar', revenue: 600 },
    { month: 'Apr', revenue: 900 },
    { month: 'May', revenue: 1300 },
  ];

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-600">Analytics & performance insights</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">
            {reports?.userStats?.totalUsers ?? analytics?.totalUsers ?? 0}
          </h2>
        </Card>

        <Card>
          <p>Total Investments</p>
          <h2 className="text-2xl font-bold">
            {reports?.investmentStats?.totalInvestments ?? 0}
          </h2>
        </Card>

        <Card>
          <p>Transactions</p>
          <h2 className="text-2xl font-bold">
            {reports?.transactionStats?.totalTransactions ?? analytics?.totalTransactions ?? 0}
          </h2>
        </Card>

        <Card>
          <p>AUM</p>
          <h2 className="text-2xl font-bold">
            ₹{(reports?.aumStats?.totalAUM ?? analytics?.totalAUM ?? 0).toLocaleString()}
          </h2>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* USER GROWTH */}
        <Card>
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="users" stroke="#0284c7" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* REVENUE */}
        <Card>
          <h3>Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#00a651" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

      </div>

      {/* EXPORT */}
      <Card>
        <h3>Export Reports</h3>
        <div className="flex gap-3 mt-3">
          <Button variant="secondary" icon={<Download size={16} />}>PDF</Button>
          <Button variant="secondary" icon={<Download size={16} />}>Excel</Button>
          <Button variant="secondary" icon={<Download size={16} />}>CSV</Button>
        </div>
      </Card>

    </div>
  );
};

export default Reports;