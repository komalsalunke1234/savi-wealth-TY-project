import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Users, TrendingUp, DollarSign, ArrowUpRight, AlertCircle,
} from 'lucide-react';

import { Card, StatCard, Table, Badge } from '../components/common';
import { getAdminAnalytics, getAdminTransactions } from '../services/api';

export const Dashboard: React.FC = () => {
const [analytics, setAnalytics] = useState<any>(null);
const [transactions, setTransactions] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

const token: string | null = localStorage.getItem('token');

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      if (!token) {
        setError('Authentication token not found');
        return;
      }

    const analyticsData = await getAdminAnalytics(token);
    const transactionsData = await getAdminTransactions(token);

    console.log("Analytics:", analyticsData);
    console.log("Transactions:", transactionsData);

    // ✅ Map backend → frontend
    setAnalytics({
      total_users: analyticsData.totalUsers || 0,
      total_aum: analyticsData.totalAUM || 0,
      total_investments: analyticsData.totalInvestments || 0,
      successful_transactions: analyticsData.totalTransactions || 0,
    });

    // ✅ Ensure array safety
    setTransactions(Array.isArray(transactionsData) ? transactionsData : []);

    setError('');
  } catch (err) {
    console.error('Dashboard Error:', err);
    setError('Failed to load dashboard data');
  } finally {
    setLoading(false);
  }
};

fetchData();
}, [token]);

// ✅ Utility function (only once)
const formatCurrency = (value: number) => {
  const suffixes = ['', 'K', 'M', 'B'];
  const suffixNum = Math.floor((value.toString().length - 1) / 3);
  let shortValue: any = parseFloat(
    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
  return shortValue + suffixes[suffixNum];
};

// ✅ Safe chart data
const chartData = transactions.slice(0, 10).map((txn: any, i: number) => ({
  name: `T${i + 1}`,
  value: parseFloat(txn.amount || 0),
}));

// ✅ Safe table data
const tableData = transactions.slice(0, 5).map((txn: any) => ({
  ...txn,
  userName: txn.userName || 'N/A',
  investmentName: txn.investmentName || 'N/A',
  amount: `₹${(parseFloat(txn.amount || 0) / 100000).toFixed(2)}L`,
  transactionDate: txn.transactionDate
    ? new Date(txn.transactionDate).toLocaleDateString('en-IN')
    : 'N/A',
  transactionStatus:
    txn.transactionStatus === 'success' ? ( <Badge variant="success">Success</Badge>
    ) : txn.transactionStatus === 'pending' ? ( <Badge variant="warning">Pending</Badge>
    ) : ( <Badge variant="danger">Failed</Badge>
    ),
}));

const columns = [
{ key: 'userName', label: 'User Name' },
{ key: 'investmentName', label: 'Investment' },
{ key: 'amount', label: 'Amount' },
{ key: 'transactionDate', label: 'Date' },
{ key: 'transactionStatus', label: 'Status' },
];

if (loading) return <div>Loading...</div>;

return (
  <div className="space-y-8">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600">Welcome back! Here's your overview.</p>
    </div>

    {/* Error */}
    {error && (
      <Card className="border-red-200 bg-red-50 flex items-center gap-4">
        <AlertCircle className="text-red-600" size={24} />
        <div className="text-red-800">{error}</div>
      </Card>
    )}

    {/* KPI */}
    <div className="grid grid-cols-4 gap-6">
      <StatCard label="Total Users" value={analytics?.total_users || 0} icon={<Users />} />
      <StatCard label="AUM" value={`₹${formatCurrency(analytics?.total_aum || 0)}`} icon={<DollarSign />} />
      <StatCard label="Investments" value={analytics?.total_investments || 0} icon={<TrendingUp />} />
      <StatCard label="Transactions" value={analytics?.successful_transactions || 0} icon={<ArrowUpRight />} />
    </div>

    {/* Chart */}
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#0284c7" />
        </LineChart>
      </ResponsiveContainer>
    </Card>

    {/* Table */}
    <Card>
      <Table columns={columns} data={tableData} />
    </Card>
  </div>
);
};

export default Dashboard;

