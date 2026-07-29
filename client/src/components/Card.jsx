import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({ application, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: application._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    background: '#fff',
    border: '1px solid #ececf1',
    borderRadius: '8px',
    padding: '14px',
    marginBottom: '10px',
    cursor: 'grab',
    boxShadow: isDragging ? '0 8px 16px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.04)'
  };

  return (
   <div
     ref={setNodeRef}
     style={style}
     {...attributes}
     {...listeners}
     onClick={() => onEdit(application)}
   >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <strong style={{ fontSize: '14px', color: '#1a1a2e' }}>{application.company}</strong>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(application._id);
          }}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#c7c9d1',
            fontSize: '13px',
            lineHeight: 1,
            padding: '2px',
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
        {application.role}
      </div>
      {application.notes && (
        <div
          style={{
            fontSize: '12px',
            color: '#9a9ea6',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #f1f1f4',
          }}
        >
          {application.notes}
        </div>
      )}
      {application.appliedDate && (
        <div style={{ fontSize: '11px', color: '#c0c3ca', marginTop: '6px' }}>
          Applied {new Date(application.appliedDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default Card;