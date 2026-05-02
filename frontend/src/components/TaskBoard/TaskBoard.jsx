import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

// Mock data for display purposes
const MOCK_TASKS = [
  { id: '1', title: 'Setup FastAPI architecture', description: 'Initialize project structure and create core modules.', status: 'done', tags: ['backend'], assignee_id: 'john' },
  { id: '2', title: 'Design MongoDB schemas', description: 'Create user, workspace, and task collections.', status: 'review', tags: ['database'], assignee_id: 'alice' },
  { id: '3', title: 'Implement React Frontend', description: 'Build beautiful kanban UI with modern aesthetics.', status: 'in_progress', tags: ['frontend', 'ui'], assignee_id: 'bob' },
  { id: '4', title: 'WebSocket integration', description: 'Add real-time comments to tasks.', status: 'todo', tags: ['real-time'], assignee_id: null },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  const columns = [
    { id: 'todo', title: 'To Do', color: 'var(--text-muted)' },
    { id: 'in_progress', title: 'In Progress', color: 'var(--primary)' },
    { id: 'review', title: 'In Review', color: 'var(--warning)' },
    { id: 'done', title: 'Done', color: 'var(--success)' }
  ];

  return (
    <div style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>Engineering Workspace</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Sprint 42 - Active</p>
        </div>
        <button className="btn-primary">+ New Task</button>
      </header>
      
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflowX: 'auto', paddingBottom: '1rem' }}>
        {columns.map(col => (
          <div key={col.id} className="kanban-col">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span className={`status-dot status-${col.id}`}></span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                {col.title}
              </h3>
              <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto' }}>
              {tasks.filter(t => t.status === col.id).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {/* Drop zone placeholder */}
              {tasks.filter(t => t.status === col.id).length === 0 && (
                <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '0.5rem', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
