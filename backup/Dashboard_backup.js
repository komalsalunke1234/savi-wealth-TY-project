import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
import { Users, TrendingUp, DollarSign, ArrowUpRight, Eye, } from 'lucide-react';
import { Card, StatCard, Button, Table, Badge } from '../components/common';
import { dashboardMetrics, investmentGrowthData, portfolioDistributionData, transactions, } from '../data/mockData';
export const Dashboard = () => {
    const formatCurrency = (value) => {
        const suffixes = ['', 'K', 'M', 'B'];
        const suffixNum = Math.floor((value.toString().length - 1) / 3);
        let shortValue = parseFloat((suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2));
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue + suffixes[suffixNum];
    };
    const recentTransactions = transactions.slice(0, 5);
    const columns = [
        { key: 'userName', label: 'User Name' },
        {
            key: 'type',
            label: 'Type',
            className: 'capitalize',
        },
        {
            key: 'amount',
            label: 'Amount',
            className: 'font-semibold',
        },
        {
            key: 'date',
            label: 'Date',
        },
        {
            key: 'status',
            label: 'Status',
        },
    ];
    const tableData = recentTransactions.map((txn) => ({
        ...txn,
        userName: txn.userName,
        type: txn.type,
        amount: `₹${(txn.amount / 100000).toFixed(2)}L`,
        date: new Date(txn.date).toLocaleDateString('en-IN'),
        status: txn.status === 'success' ? (_jsx(Badge, { variant: "success", children: "Success" })) : txn.status === 'pending' ? (_jsx(Badge, { variant: "warning", children: "Pending" })) : (_jsx(Badge, { variant: "danger", children: "Failed" })),
    }));
    const tableActions = () => (_jsx(Button, { variant: "secondary", size: "sm", children: "View" }));
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Dashboard" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Welcome back! Here's your platform overview." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(StatCard, { label: "Total Users", value: dashboardMetrics.totalUsers.toLocaleString('en-IN'), icon: _jsx(Users, { size: 24 }), trend: { value: 12.5, direction: 'up' }, color: "blue" }), _jsx(StatCard, { label: "Assets Under Management", value: formatCurrency(dashboardMetrics.assetsUnderManagement), icon: _jsx(DollarSign, { size: 24 }), trend: { value: 8.2, direction: 'up' }, color: "green" }), _jsx(StatCard, { label: "Total Investments", value: dashboardMetrics.totalInvestments.toLocaleString('en-IN'), icon: _jsx(TrendingUp, { size: 24 }), trend: { value: 5.1, direction: 'up' }, color: "orange" }), _jsx(StatCard, { label: "Monthly Growth Rate", value: `${dashboardMetrics.monthlyGrowth}%`, icon: _jsx(ArrowUpRight, { size: 24 }), trend: { value: 2.3, direction: 'up' }, color: "green" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Investment Growth" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: investmentGrowthData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "month", stroke: "#6b7280" }), _jsx(YAxis, { stroke: "#6b7280" }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                            } }), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#0284c7", strokeWidth: 2, dot: { fill: '#0284c7', r: 5 }, activeDot: { r: 7 } })] }) })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Portfolio Distribution" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: portfolioDistributionData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: portfolioDistributionData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Transaction Status" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Successful" }), _jsx("span", { className: "text-lg font-semibold text-success-600", children: dashboardMetrics.successfulTransactions })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-success-600 h-2 rounded-full", style: {
                                                        width: `${(dashboardMetrics.successfulTransactions /
                                                            (dashboardMetrics.successfulTransactions +
                                                                dashboardMetrics.failedTransactions +
                                                                dashboardMetrics.pendingTransactions)) *
                                                            100}%`,
                                                    } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Pending" }), _jsx("span", { className: "text-lg font-semibold text-warning-600", children: dashboardMetrics.pendingTransactions })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-warning-600 h-2 rounded-full", style: {
                                                        width: `${(dashboardMetrics.pendingTransactions /
                                                            (dashboardMetrics.successfulTransactions +
                                                                dashboardMetrics.failedTransactions +
                                                                dashboardMetrics.pendingTransactions)) *
                                                            100}%`,
                                                    } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Failed" }), _jsx("span", { className: "text-lg font-semibold text-danger-600", children: dashboardMetrics.failedTransactions })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-danger-600 h-2 rounded-full", style: {
                                                        width: `${(dashboardMetrics.failedTransactions /
                                                            (dashboardMetrics.successfulTransactions +
                                                                dashboardMetrics.failedTransactions +
                                                                dashboardMetrics.pendingTransactions)) *
                                                            100}%`,
                                                    } }) })] })] })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Key Metrics" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Active Investors" }), _jsx("span", { className: "font-semibold text-gray-900", children: dashboardMetrics.activeInvestors })] }), _jsxs("div", { className: "border-t border-gray-200 pt-4 flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Pending Transactions" }), _jsx("span", { className: "font-semibold text-gray-900", children: dashboardMetrics.pendingTransactions })] }), _jsxs("div", { className: "border-t border-gray-200 pt-4 flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Conversion Rate" }), _jsx("span", { className: "font-semibold text-gray-900", children: "85.7%" })] })] })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { variant: "primary", className: "w-full", size: "sm", children: "Create Investment Plan" }), _jsx(Button, { variant: "secondary", className: "w-full", size: "sm", children: "Add New User" }), _jsx(Button, { variant: "secondary", className: "w-full", size: "sm", children: "View Reports" })] })] })] }), _jsxs(Card, { children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Recent Transactions" }), _jsx(Button, { variant: "secondary", size: "sm", icon: _jsx(Eye, { size: 16 }), children: "View All" })] }), _jsx(Table, { columns: columns, data: tableData, actions: tableActions })] })] }));
};
