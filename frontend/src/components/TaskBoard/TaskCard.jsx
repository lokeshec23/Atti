import React from 'react';
import { MessageSquare, Paperclip } from 'lucide-react';

export default function TaskCard({ task }) {
  // Helper to generate tag colors based on content
  const getTagStyle = (tag) => {
    switch(tag) {
      case 'frontend': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }; // Blue
      case 'backend': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }; // Emerald
      case 'database': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }; // Amber
      case 'ui': return { bg: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }; // Pink
      default: return { bg: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }; // Violet
    }
  };

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.8)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      cursor: 'grab',
      border: '1px solid var(--border-color)',
      transition: 'var(--transition)',
      boxShadow: 'var(--shadow-sm)'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.borderColor = 'var(--border-highlight)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
    }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {task.tags.map(tag => {
          const style = getTagStyle(tag);
          return (
            <span key={tag} style={{ 
              background: style.bg, 
              color: style.color, 
              padding: '0.2rem 0.6rem', 
              borderRadius: '1rem', 
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {tag}
            </span>
          );
        })}
      </div>
      
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', lineHeight: '1.4' }}>{task.title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 1rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.description}
      </p>
      
      <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
            <MessageSquare size={14} /> 3
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
            <Paperclip size={14} /> 1
          </div>
        </div>
        
        {task.assignee ? (
          <div title={task.assignee.name} style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 'bold', color: 'white',
            boxShadow: '0 0 0 2px var(--bg-dark)'
          }}>
            {task.assignee.avatar}
          </div>
        ) : (
          <div title="Unassigned" style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: '1px dashed rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} />
        )}
      </div>
    </div>
  );
}
