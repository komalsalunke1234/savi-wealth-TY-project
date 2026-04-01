import React, { useState, useEffect } from 'react';
import { Plus, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Card, Button, Badge, Modal } from '../components/common';
import { getAdminNotifications } from '../services/api';

export const Notifications: React.FC = () => {
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Missing token');

        const data = await getAdminNotifications(token);

        console.log("RAW NOTIFICATIONS:", data);

        // ✅ HANDLE ARRAY OR OBJECT
        const list = Array.isArray(data)
          ? data
          : data.notifications || [];

        // ✅ SAFE MAPPING
        const mapped = list.map((n: any) => ({
          id: n.id,
          title: n.title || 'No Title',
          message: n.message || '',
          type: (n.type || 'info').toLowerCase(),
          read: n.read ?? n.isRead ?? false,
          createdAt: n.createdAt || n.created_at || new Date(),
        }));

        setNotificationsList(mapped);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  /* ================= LOGIC ================= */

  const filteredNotifications = notificationsList.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const toggleRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  /* ================= HELPERS ================= */

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'danger':
        return <AlertCircle size={20} className="text-red-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  const getVariant = (type: string): any => {
    if (type === 'success') return 'success';
    if (type === 'danger') return 'danger';
    if (type === 'warning') return 'warning';
    return 'info';
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-600">Manage system alerts</p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setShowModal(true)}
        >
          Create
        </Button>
      </div>

      {/* STATS */}
      <Card>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p>Total</p>
            <p className="text-2xl font-bold">{notificationsList.length}</p>
          </div>
          <div>
            <p>Unread</p>
            <p className="text-2xl font-bold">{unreadCount}</p>
          </div>
          <div>
            <p>Read</p>
            <p className="text-2xl font-bold">
              {notificationsList.length - unreadCount}
            </p>
          </div>
        </div>
      </Card>

      {/* FILTER */}
      <div className="flex gap-3">
        {['all', 'unread', 'read'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-3 py-1 rounded ${
              filter === tab ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredNotifications.length === 0 ? (
        <Card className="text-center py-10">
          <Bell size={40} className="mx-auto text-gray-400" />
          <p>No notifications</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <Card key={notif.id} className={!notif.read ? 'bg-blue-50' : ''}>
              <div className="flex justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    {getIcon(notif.type)}
                    <h3 className="font-semibold">{notif.title}</h3>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {notif.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                <Badge variant={getVariant(notif.type)}>
                  {notif.type}
                </Badge>

              </div>

              <div className="flex gap-3 mt-2 text-sm">
                <button onClick={() => toggleRead(notif.id)}>
                  {notif.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button onClick={() => deleteNotification(notif.id)}>
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create Notification"
      >
        <p>Form UI ready (connect later)</p>

        <div className="flex gap-2 mt-4">
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary">Send</Button>
        </div>
      </Modal>

    </div>
  );
};

export default Notifications;