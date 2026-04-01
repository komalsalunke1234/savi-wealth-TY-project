import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Phone, Mail } from 'lucide-react';
import { Card, Button, Badge, Modal, Input } from '../components/common';
import { getAdminAdvisors } from '../services/api';

export const Advisors: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<any>(null);

  const [advisors, setAdvisors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleEdit = (advisor: any) => {
    setEditingAdvisor(advisor);
    setShowModal(true);
  };

  /* ================= FETCH ADVISORS ================= */
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Missing auth token');

        const data: any = await getAdminAdvisors(token);

        console.log("RAW ADVISORS:", data);

        // ✅ HANDLE BOTH ARRAY & OBJECT RESPONSE
        const advisorsArray = Array.isArray(data)
          ? data
          : data.advisors || [];

        // ✅ MAP BACKEND → FRONTEND SAFE STRUCTURE
        const mapped = advisorsArray.map((a: any) => ({
          id: a.id,
          name: a.fullName || a.name || 'N/A',
          email: a.email || 'N/A',
          phone: a.phone || 'N/A',
          status: a.status || 'inactive',
          rating: parseFloat(a.rating) || 4.5,
          assignedClients: a.assignedClients || a.clientsCount || 0,
          joinDate: a.joinDate || new Date(),
          expertise: Array.isArray(a.expertise)
            ? a.expertise
            : a.expertise
            ? a.expertise.split(',')
            : ['General'],
        }));

        setAdvisors(mapped);
        setError('');
      } catch (err) {
        console.error('Error fetching advisors:', err);
        setError('Failed to load advisors');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAdvisor(null);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return 'text-green-600';
    if (rating >= 4.5) return 'text-blue-600';
    return 'text-orange-600';
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advisor Management</h1>
          <p className="text-gray-600 mt-2">
            Manage financial advisors and track performance.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => {
            setEditingAdvisor(null);
            setShowModal(true);
          }}
        >
          Add Advisor
        </Button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm text-gray-600">Total Advisors</p>
          <p className="text-3xl font-bold">{advisors.length}</p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Total Clients</p>
          <p className="text-3xl font-bold">
            {advisors.reduce((sum, a) => sum + a.assignedClients, 0)}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Avg Rating</p>
          <p className="text-3xl font-bold">
            {advisors.length
              ? (
                  advisors.reduce((s, a) => s + a.rating, 0) / advisors.length
                ).toFixed(1)
              : '0'}
          </p>
        </Card>
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading advisors...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {advisors.map((advisor) => (
            <Card key={advisor.id}>

              {/* HEADER */}
              <div className="flex justify-between mb-3">
                <div>
                  <h3 className="font-bold">{advisor.name}</h3>
                  <p className="text-sm text-gray-500">
                    {advisor.expertise[0]}
                  </p>
                </div>

                <Badge variant={advisor.status === 'active' ? 'success' : 'warning'}>
                  {advisor.status}
                </Badge>
              </div>

              {/* CONTACT */}
              <p className="text-sm flex gap-2">
                <Mail size={14} /> {advisor.email}
              </p>
              <p className="text-sm flex gap-2">
                <Phone size={14} /> {advisor.phone}
              </p>

              {/* RATING */}
              <div className="mt-3">
                <span className={getRatingColor(advisor.rating)}>
                  ⭐ {advisor.rating}
                </span>
              </div>

              {/* STATS */}
              <div className="mt-3 text-sm">
                Clients: {advisor.assignedClients}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                <Button size="sm" onClick={() => handleEdit(advisor)}>
                  <Edit2 size={14} />
                </Button>

                <Button size="sm" variant="danger">
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}

        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingAdvisor ? 'Edit Advisor' : 'Add Advisor'}
      >
        <Input label="Name" defaultValue={editingAdvisor?.name} />
        <Input label="Email" defaultValue={editingAdvisor?.email} />

        <div className="flex gap-2 mt-4">
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </Modal>

    </div>
  );
};

export default Advisors;