import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Plus, Search, Filter } from 'lucide-react';

const MOCK_TASKS = [
  { id: '1', title: 'Setup FastAPI architecture', description: 'Initialize project structure and create core modules.', status: 'done', tags: ['backend'], assignee: { name: 'John Doe', avatar: 'J' } },
  { id: '2', title: 'Design MongoDB schemas', description: 'Create user, workspace, and task collections.', status: 'review', tags: ['database'], assignee: { name: 'Alice Smith', avatar: 'A' } },
  { id: '3', title: 'Implement React Frontend', description: 'Build beautiful kanban UI with modern aesthetics.', status: 'in_progress', tags: ['frontend', 'ui'], assignee: { name: 'Lokesh', avatar: 'L' } },
  { id: '4', title: 'WebSocket integration', description: 'Add real-time comments to tasks.', status: 'todo', tags: ['real-time'], assignee: null },
  { id: '5', title: 'OAuth2 Authentication', description: 'Implement Google and GitHub login providers.', status: 'in_progress', tags: ['auth', 'security'], assignee: { name: 'John Doe', avatar: 'J' } }
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  const columns = [
    { id: 'todo', title: 'To Do', count: tasks.filter(t => t.status === 'todo').length },
    { id: 'in_progress', title: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length },
    { id: 'review', title: 'In Review', count: tasks.filter(t => t.status === 'review').length },
    { id: 'done', title: 'Done', count: tasks.filter(t => t.status === 'done').length }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Engineering Workspace</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sprint 42 • Active</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-field" placeholder="Search tasks..." style={{ paddingLeft: '2.5rem', width: '250px' }} />
          </div>
          <button className="btn-secondary">
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-primary">
            <Plus size={18} />
            New Task
          </button>
        </div>
      </header>
      
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflowX: 'auto', paddingBottom: '1rem' }}>
        {columns.map(col => (
          <div key={col.id} className="kanban-col">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className={`status-dot status-${col.id}`}></span>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{col.title}</h3>
              </div>
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '0.1rem 0.6rem', 
                borderRadius: '1rem', 
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {col.count}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
              {tasks.filter(t => t.status === col.id).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {/* Add New Task button at bottom of column */}
              <button style={{
                background: 'transparent',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <Plus size={16} /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
