import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, Button, Badge, Table } from '../components/common';
import { getInvestments } from '../services/api';

export const Investments: React.FC = () => {
const [investments, setInvestments] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// 🔥 FETCH INVESTMENTS
useEffect(() => {
  const fetchInvestments = async () => {
    try {
      setLoading(true);

      const data = await getInvestments();

      console.log("Investments API:", data);

      // ✅ Safe handling (backend may not exist yet)
      setInvestments(Array.isArray(data) ? data : []);

      setError('');
  } catch (err) {
    console.error(err);

    // ✅ fallback (important)
    setError('No investments API yet — using demo mode');
    setInvestments([]);
  } finally {
    setLoading(false);
  }
};

fetchInvestments();
}, []);

// 🔥 TABLE DATA
const tableData = investments.map((inv) => ({
  ...inv,
  name: inv.name || 'N/A',
  type: (inv.type || 'N/A').toUpperCase(),
  riskLevel:
    inv.riskLevel === 'low' ? (
      <Badge variant="success">Low</Badge>
    ) : inv.riskLevel === 'medium' ? (
      <Badge variant="warning">Medium</Badge>
    ) : (
      <Badge variant="danger">High</Badge>
    ),
  expectedReturn: `${inv.expectedReturn || 0}%`,
  minInvestment: `₹${((inv.minInvestment || 0) / 100000).toFixed(2)}L`,
  investorCount: inv.investorCount || 0,
}));

const columns = [
{ key: 'name', label: 'Investment Name' },
{ key: 'type', label: 'Type' },
{ key: 'riskLevel', label: 'Risk' },
{ key: 'expectedReturn', label: 'Returns' },
{ key: 'minInvestment', label: 'Min Investment' },
{ key: 'investorCount', label: 'Investors' },
];

const tableActions = (_row: any) => ( <div className="flex gap-2">
<Button variant="secondary" size="sm" icon={<Edit size={16} />}>
Edit </Button>
<Button variant="danger" size="sm" icon={<Trash2 size={16} />}>
Delete </Button> </div>
);

if (loading) return <p>Loading investments...</p>;

return ( <div className="space-y-6">

  {/* Header */}
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
      <p className="text-gray-600 mt-2">
        Manage investment plans and offerings.
      </p>
    </div>

    <Button variant="primary" icon={<Plus size={16} />}>
      Add Investment
    </Button>
  </div>

  {/* Error */}
  {error && (
    <Card className="border-yellow-200 bg-yellow-50">
      <p className="text-yellow-800">{error}</p>
    </Card>
  )}

  {/* Table */}
  <Card>
    {tableData.length > 0 ? (
      <Table columns={columns} data={tableData} actions={tableActions} />
    ) : (
      <div className="text-center py-8 text-gray-600">
        No investments available
      </div>
    )}
  </Card>

</div>
);

};

export default Investments;
