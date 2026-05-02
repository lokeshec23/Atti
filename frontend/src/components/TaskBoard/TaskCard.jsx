import React from 'react';

export default function TaskCard({ task }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'todo': return 'var(--text-muted)';
      case 'in_progress': return 'var(--primary)';
      case 'review': return 'var(--warning)';
      case 'done': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="kanban-card" style={{ borderLeftColor: getStatusColor(task.status) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', margin: 0 }}>{task.title}</h4>
      </div>
      {task.description && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {task.tags?.map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '1rem', color: 'var(--text-light)' }}>
              {tag}
            </span>
          ))}
        </div>
        {task.assignee_id && (
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
            {task.assignee_id.substring(0,2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
