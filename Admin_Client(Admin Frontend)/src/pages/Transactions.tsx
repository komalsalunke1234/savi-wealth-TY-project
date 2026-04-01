import React, { useState, useEffect } from 'react';
import { Download, Filter } from 'lucide-react';
import { Card, Button, Badge, Table, Pagination } from '../components/common';
import { getAdminTransactions } from '../services/api';

export const Transactions: React.FC = () => {
const [currentPage, setCurrentPage] = useState(1);
const [typeFilter, setTypeFilter] = useState<string>('all');
const [statusFilter, setStatusFilter] = useState<string>('all');
const [searchTerm, setSearchTerm] = useState('');

const [transactions, setTransactions] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

const itemsPerPage = 10;

// 🔥 FETCH DATA
useEffect(() => {
  const fetchTxns = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Missing token');

      const data = await getAdminTransactions(token);

    console.log("Transactions API:", data);

    // ✅ FIX: backend returns array directly
    setTransactions(Array.isArray(data) ? data : []);

    setError('');
  } catch (err) {
    console.error(err);
    setError('Failed to load transactions');
  } finally {
    setLoading(false);
  }
};
fetchTxns();
}, []);

// 🔥 FILTER LOGIC (SAFE)
const filteredTransactions = transactions.filter((txn) => {
  const userName = txn.userName || '';
  const id = String(txn.id || '');

  const matchesSearch =
    userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    id.toLowerCase().includes(searchTerm.toLowerCase());

  const type = txn.transactionType || '';
  const status = txn.transactionStatus || '';

  const matchesType = typeFilter === 'all' || type === typeFilter;
  const matchesStatus = statusFilter === 'all' || status === statusFilter;

  return matchesSearch && matchesType && matchesStatus;
});

// 🔥 PAGINATION
const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

const paginatedData = filteredTransactions.slice(
(currentPage - 1) * itemsPerPage,
currentPage * itemsPerPage
);

// 🔥 TABLE DATA
const tableData = paginatedData.map((txn) => ({
  ...txn,
  id: txn.id || 'N/A',
  userName: txn.userName || 'N/A',
  type: (txn.transactionType || 'N/A')
    .charAt(0)
    .toUpperCase() + (txn.transactionType || '').slice(1),
  amount: `₹${((txn.amount || 0) / 100000).toFixed(2)}L`,
  date: txn.transactionDate
    ? new Date(txn.transactionDate).toLocaleDateString('en-IN')
    : 'N/A',
  status:
    txn.transactionStatus === 'success' ? (
      <Badge variant="success">Success</Badge>
    ) : txn.transactionStatus === 'pending' ? (
      <Badge variant="warning">Pending</Badge>
    ) : (
      <Badge variant="danger">Failed</Badge>
    ),
}));

const columns = [
{ key: 'id', label: 'Transaction ID' },
{ key: 'userName', label: 'User Name' },
{ key: 'type', label: 'Type' },
{ key: 'amount', label: 'Amount' },
{ key: 'date', label: 'Date' },
{ key: 'status', label: 'Status' },
];

const tableActions = () => ( <Button variant="secondary" size="sm">
Details </Button>
);

// 🔥 STATS
const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
const successCount = transactions.filter((t) => t.transactionStatus === 'success').length;
const pendingCount = transactions.filter((t) => t.transactionStatus === 'pending').length;

if (loading) return <p>Loading transactions...</p>;

if (error) return <p className="text-red-600 font-semibold">{error}</p>;

return ( <div className="space-y-6">

  {/* Header */}
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
    <p className="text-gray-600 mt-2">
      View and manage all investment transactions.
    </p>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-4 gap-6">
    <Card>
      <p className="text-sm text-gray-600">Total</p>
      <p className="text-3xl font-bold">{transactions.length}</p>
    </Card>

    <Card>
      <p className="text-sm text-gray-600">Amount</p>
      <p className="text-3xl font-bold">
        ₹{(totalAmount / 10000000).toFixed(1)}Cr
      </p>
    </Card>

    <Card>
      <p className="text-sm text-gray-600">Success</p>
      <p className="text-3xl font-bold text-green-600">{successCount}</p>
    </Card>

    <Card>
      <p className="text-sm text-gray-600">Pending</p>
      <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
    </Card>
  </div>

  {/* Filters */}
  <Card>
    <div className="grid grid-cols-5 gap-4">

      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="all">All Types</option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All Status</option>
        <option value="success">Success</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>

      <Button variant="secondary" size="sm" icon={<Filter size={16} />}>
        Filters
      </Button>

      <Button variant="secondary" size="sm" icon={<Download size={16} />}>
        Export
      </Button>

    </div>
  </Card>

  {/* Table */}
  <Card>
    <Table columns={columns} data={tableData} actions={tableActions} />
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </Card>

</div>
);

};

export default Transactions;

