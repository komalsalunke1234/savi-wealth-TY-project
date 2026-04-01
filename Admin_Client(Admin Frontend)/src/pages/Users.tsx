import { useState, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, Filter } from 'lucide-react';
import { Card, Button, Badge, Table, Modal } from '../components/common';
import { getAdminUsers } from '../services/api';

export const Users: React.FC = () => {
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState<string>('all');
const [selectedUser, setSelectedUser] = useState<any>(null);
const [showModal, setShowModal] = useState(false);

const [users, setUsers] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// 🔥 FETCH USERS
useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Missing token');

      const data = await getAdminUsers(token);

    console.log("Users API:", data);

    // ✅ FIX: backend returns array directly
    setUsers(Array.isArray(data) ? data : []);

    setError('');
  } catch (err) {
    console.error(err);
    setError('Failed to load users');
  } finally {
    setLoading(false);
  }
};

fetchUsers();
}, []);

// 🔥 FILTER USERS
const filteredUsers = users.filter((user) => {
  const name = user.fullName || '';
  const email = user.email || '';

  const matchesSearch =
  name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  email.toLowerCase().includes(searchTerm.toLowerCase());

const matchesStatus =
  statusFilter === 'all' || user.status === statusFilter;

return matchesSearch && matchesStatus;
});

// 🔥 VIEW USER
const handleViewUser = (user: any) => {
setSelectedUser(user);
setShowModal(true);
};

// 🔥 TABLE DATA
const tableData = filteredUsers.map((user) => ({
...user,
name: user.fullName || 'N/A',
email: user.email || 'N/A',
status:
user.status === 'active' ? ( <Badge variant="success">Active</Badge>
) : user.status === 'suspended' ? ( <Badge variant="danger">Suspended</Badge>
) : ( <Badge variant="warning">Inactive</Badge>
),
kycStatus:
user.kycStatus === 'verified' ? ( <Badge variant="success">Verified</Badge>
) : user.kycStatus === 'pending' ? ( <Badge variant="warning">Pending</Badge>
) : ( <Badge variant="danger">Rejected</Badge>
),
aum: `₹${((user.aum || 0) / 100000).toFixed(2)}L`,
joinDate: user.joinDate
? new Date(user.joinDate).toLocaleDateString('en-IN')
: 'N/A',
}));

const columns = [
{ key: 'name', label: 'Name' },
{ key: 'email', label: 'Email' },
{ key: 'status', label: 'Status' },
{ key: 'kycStatus', label: 'KYC Status' },
{ key: 'aum', label: 'AUM' },
{ key: 'joinDate', label: 'Join Date' },
];

const tableActions = (row: any) => ( <div className="flex gap-2">
<Button
variant="secondary"
size="sm"
icon={<Eye size={16} />}
onClick={() => handleViewUser(row)}
>
View </Button>
<Button variant="danger" size="sm" icon={<Trash2 size={16} />}>
Disable </Button> </div>
);

if (loading) return <p>Loading users...</p>;

if (error)
return <p className="text-red-600 font-semibold">{error}</p>;

return (
  <div className="space-y-6">

  {/* Header */}
  <div>
    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
    <p className="text-gray-600 mt-2">
      Manage users, view details, and handle KYC verification.
    </p>
  </div>

  {/* Filters */}
  <Card>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="all">All Users</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="suspended">Suspended</option>
      </select>

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" size="sm" icon={<Filter size={16} />}>
          Filters
        </Button>
        <Button variant="primary" size="sm" icon={<Plus size={16} />}>
          Add User
        </Button>
      </div>
    </div>
  </Card>

  {/* Table */}
  <Card>
    <Table columns={columns} data={tableData} actions={tableActions} />
  </Card>

  {/* Modal */}
  {selectedUser && (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title="User Details"
    >
      <div className="space-y-4">

        <p><b>Name:</b> {selectedUser.fullName}</p>
        <p><b>Email:</b> {selectedUser.email}</p>
        <p><b>Phone:</b> {selectedUser.phone}</p>
        <p><b>Status:</b> {selectedUser.status}</p>
        <p><b>KYC:</b> {selectedUser.kycStatus}</p>
        <p><b>Join Date:</b> {selectedUser.joinDate}</p>

      </div>
    </Modal>
  )}
  </div>
);
};

export default Users;

