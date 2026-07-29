import { useState } from 'react';

const EditModal = ({ application, onClose, onSave }) => {
  const [company, setCompany] = useState(application.company);
  const [role, setRole] = useState(application.role);
  const [notes, setNotes] = useState(application.notes || '');
  const [appliedDate, setAppliedDate] = useState(
    application.appliedDate ? application.appliedDate.slice(0, 10) : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(application._id, { company, role, notes, appliedDate });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '24px',
          width: '360px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '17px', color: '#1a1a2e' }}>
          Edit Application
        </h3>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '12px', color: '#6b7280' }}>Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontSize: '12px', color: '#6b7280' }}>Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle} />

          <label style={{ fontSize: '12px', color: '#6b7280' }}>Applied Date</label>
          <input
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontSize: '12px', color: '#6b7280' }}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #e2e4e9',
                background: '#fff',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                border: 'none',
                background: '#4f46e5',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  marginTop: '4px',
  marginBottom: '12px',
  border: '1px solid #e2e4e9',
  borderRadius: '6px',
  fontSize: '14px',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

export default EditModal;