import { useState, useEffect } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Column from '../components/Column';
import EditModal from '../components/EditModal';

const COLUMNS = [
  { id: 'applied', title: 'Applied' },
  { id: 'interview', title: 'Interview' },
  { id: 'offer', title: 'Offer' },
  { id: 'rejected', title: 'Rejected' },
];

const Board = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [editingApp, setEditingApp] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!company || !role) return;

    try {
      const res = await api.post('/applications', { company, role });
      setApplications((prev) => [...prev, res.data]);
      setCompany('');
      setRole('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSave = async (id, updatedFields) => {
    try {
      const res = await api.patch(`/applications/${id}`, updatedFields);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? res.data : app))
      );
      setEditingApp(null);
    } catch (err) {
      console.error(err);
    }
  };

  const findColumnOf = (id) => {
    const app = applications.find((a) => a._id === id);
    return app ? app.status : null;
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = findColumnOf(activeId);
    // "over" might be a column id (dropped on empty area) or a card id
    const overColumn = findColumnOf(overId) || overId;

    if (!activeColumn || !overColumn) return;

    let updated = [...applications];

    if (activeColumn === overColumn) {
      // Reordering within the same column
      const columnItems = updated.filter((a) => a.status === activeColumn);
      const oldIndex = columnItems.findIndex((a) => a._id === activeId);
      const newIndex = columnItems.findIndex((a) => a._id === overId);

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(columnItems, oldIndex, newIndex);

      reordered.forEach((item, index) => {
        item.order = index;
      });

      updated = updated.map((a) => {
        if (a.status !== activeColumn) return a;
        return reordered.find((r) => r._id === a._id);
      });
    } else {
      // Moving to a different column
      updated = updated.map((a) => {
        if (a._id === activeId) {
          return { ...a, status: overColumn };
        }
        return a;
      });

      const destItems = updated.filter((a) => a.status === overColumn);
      destItems.forEach((item, index) => {
        item.order = index;
      });

      updated = updated.map((a) => {
        const match = destItems.find((d) => d._id === a._id);
        return match || a;
      });
    }

    setApplications(updated);

    const payload = updated.map((a) => ({ id: a._id, status: a.status, order: a.order }));

    try {
      await api.patch('/applications/reorder', payload);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f2f5',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          color: '#8a8f98',
        }}
      >
        Loading your board...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e4e9',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#1a1a2e' }}>Job Application Tracker</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#8a8f98' }}>Welcome back, {user?.name}</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '8px 18px',
            border: '1px solid #e2e4e9',
            background: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#444',
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: '24px 32px' }}>
        <form
          onSubmit={handleAdd}
          style={{
            marginBottom: '24px',
            display: 'flex',
            gap: '10px',
            background: '#fff',
            padding: '16px',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <input
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #e2e4e9',
              borderRadius: '6px',
              fontSize: '14px',
              flex: 1,
            }}
          />
          <input
            placeholder="Role / Position"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #e2e4e9',
              borderRadius: '6px',
              fontSize: '14px',
              flex: 1,
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            + Add Application
          </button>
        </form>

        {applications.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#fff',
              borderRadius: '12px',
              marginBottom: '24px',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗂️</div>
            <h3 style={{ margin: 0, color: '#1a1a2e', fontSize: '17px' }}>
              Your board is empty
            </h3>
            <p style={{ margin: '8px 0 0', color: '#8a8f98', fontSize: '14px' }}>
              Add your first job application above to start tracking your search
            </p>
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }}>
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                applications={applications
                  .filter((a) => a.status === col.id)
                  .sort((a, b) => a.order - b.order)}
                onDelete={handleDelete}
                onEdit={setEditingApp}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {editingApp && (
        <EditModal
          application={editingApp}
          onClose={() => setEditingApp(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Board;