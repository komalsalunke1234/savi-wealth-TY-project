import React, { useState, useEffect } from 'react';
import {
PieChart, Pie, Cell,
BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, Button, Table } from '../components/common';
import { getAdminPortfolios } from '../services/api';

export const Portfolios: React.FC = () => {
const [portfolios, setPortfolios] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// 🔥 FETCH DATA
useEffect(() => {
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Missing token');

      const data = await getAdminPortfolios(token);

    console.log("Portfolios API:", data);

    // ✅ FIX: backend returns array directly
    setPortfolios(Array.isArray(data) ? data : []);

    setError('');
  } catch (err) {
    console.error(err);
    setError('Failed to load portfolios');
  } finally {
    setLoading(false);
  }
};

fetchPortfolios();
}, []);

// 🔥 SAFE CHART DATA
const portfolioChartData = portfolios.map((p) => ({
name: p.userName || 'N/A',
stocks: p.stocks || 0,
mutualFunds: p.mutualFunds || 0,
bonds: p.bonds || 0,
others: p.others || 0,
}));

// 🔥 TABLE DATA
const tableData = portfolios.map((p) => ({
  ...p,
  userName: p.userName || 'N/A',
  stocks: `${p.stocks || 0}%`,
  mutualFunds: `${p.mutualFunds || 0}%`,
  bonds: `${p.bonds || 0}%`,
  totalValue: `₹${((p.totalValue || 0) / 100000).toFixed(2)}L`,
  monthlyReturn: (
    <div className="flex items-center gap-1">
      {(p.monthlyReturn || 0) >= 0 ? (
        <>
          <TrendingUp size={16} className="text-green-600" />
          <span className="text-green-600 font-semibold">
            +{p.monthlyReturn || 0}%
          </span>
        </>
      ) : (
        <>
          <TrendingDown size={16} className="text-red-600" />
          <span className="text-red-600 font-semibold">
            {p.monthlyReturn}%
          </span>
        </>
      )}
    </div>
  ),
}));

const columns = [
{ key: 'userName', label: 'User Name' },
{ key: 'stocks', label: 'Stocks' },
{ key: 'mutualFunds', label: 'Mutual Funds' },
{ key: 'bonds', label: 'Bonds' },
{ key: 'totalValue', label: 'Total Value' },
{ key: 'monthlyReturn', label: 'Monthly Return' },
];

const tableActions = () => (
<Button variant="secondary" size="sm" icon={<Eye size={16} />}>
View </Button>
);

// 🔥 SAFE STATS
const totalValue = portfolios.reduce((sum, p) => sum + (p.totalValue || 0), 0);
const avgReturn =
portfolios.length > 0
? (
portfolios.reduce((sum, p) => sum + (p.monthlyReturn || 0), 0) /
portfolios.length
).toFixed(2)
: '0';

// 🔥 STATIC ALLOCATION (UI)
const allocationData = [
{ name: 'Stocks', value: 40, color: '#0284c7' },
{ name: 'Mutual Funds', value: 35, color: '#00a651' },
{ name: 'Bonds', value: 20, color: '#f59e0b' },
{ name: 'Others', value: 5, color: '#9ca3af' },
];

if (loading) return <p>Loading portfolios...</p>;
if (error) return <p className="text-red-600 font-semibold">{error}</p>;

return ( <div className="space-y-6">

  {/* Header */}
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Portfolio Overview</h1>
    <p className="text-gray-600 mt-2">
      Track portfolio composition across users.
    </p>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-3 gap-6">
    <Card>
      <p>Total Portfolios</p>
      <h2 className="text-3xl font-bold">{portfolios.length}</h2>
    </Card>

    <Card>
      <p>Total Assets</p>
      <h2 className="text-3xl font-bold">
        ₹{(totalValue / 10000000).toFixed(1)}Cr
      </h2>
    </Card>

    <Card>
      <p>Avg Return</p>
      <h2 className="text-3xl font-bold text-green-600">{avgReturn}%</h2>
    </Card>
  </div>

  {/* Pie Chart */}
  <Card>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={allocationData} dataKey="value">
          {allocationData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </Card>

  {/* Bar Chart */}
  <Card>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={portfolioChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stocks" stackId="a" fill="#0284c7" />
        <Bar dataKey="mutualFunds" stackId="a" fill="#00a651" />
        <Bar dataKey="bonds" stackId="a" fill="#f59e0b" />
        <Bar dataKey="others" stackId="a" fill="#9ca3af" />
      </BarChart>
    </ResponsiveContainer>
  </Card>

  {/* Table */}
  <Card>
    <Table columns={columns} data={tableData} actions={tableActions} />
  </Card>

</div>
);

};

export default Portfolios;
