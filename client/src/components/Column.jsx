import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';

const COLUMN_COLORS = {
  applied: { bg: '#eef2ff', text: '#4338ca', dot: '#6366f1' },
  interview: { bg: '#fffbeb', text: '#b45309', dot: '#f59e0b' },
  offer: { bg: '#ecfdf5', text: '#047857', dot: '#10b981' },
  rejected: { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
};

const Column = ({ id, title, applications, onDelete, onEdit }) => {
  const { setNodeRef } = useDroppable({ id });
  const cardIds = applications.map((app) => app._id);
  const colors = COLUMN_COLORS[id] || { bg: '#f4f5f7', text: '#333', dot: '#999' };

  return (
    <div
      style={{
        background: '#f7f8fa',
        borderRadius: '10px',
        padding: '14px',
        width: '270px',
        flexShrink: 0,
        minHeight: '500px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
          padding: '6px 10px',
          background: colors.bg,
          borderRadius: '6px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: colors.dot,
            display: 'inline-block',
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: 600, color: colors.text }}>
          {title}
        </span>
        <span style={{ fontSize: '12px', color: colors.text, marginLeft: 'auto', opacity: 0.7 }}>
          {applications.length}
        </span>
      </div>

      <div ref={setNodeRef} style={{ minHeight: '400px' }}>
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {applications.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: '#b0b4bb',
                fontSize: '13px',
                padding: '30px 10px',
                border: '1.5px dashed #e2e4e9',
                borderRadius: '8px',
              }}
            >
              No applications yet
            </div>
          )}
          {applications.map((app) => (
     <Card key={app._id} application={app} onDelete={onDelete} onEdit={onEdit} />
   ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;