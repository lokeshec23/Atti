import React from 'react';
import { Activity, Users, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Tasks', value: '124', icon: <Activity className="text-primary" size={24} color="var(--primary)" />, trend: '+12%' },
    { title: 'Active Members', value: '12', icon: <Users size={24} color="var(--info)" />, trend: '+2' },
    { title: 'Tasks Completed', value: '89', icon: <CheckCircle size={24} color="var(--success)" />, trend: '+5%' },
    { title: 'In Review', value: '8', icon: <Clock size={24} color="var(--warning)" />, trend: '-2' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, Lokesh</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your projects today.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.875rem', color: stat.trend.startsWith('+') ? 'var(--success)' : 'var(--text-muted)', fontWeight: '500' }}>
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', margin: '0 0 0.25rem 0' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Recent Activity */}
        <div className="glass-panel">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map(item => (
              <div key={item} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: item !== 3 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--info), var(--primary))', flexShrink: 0 }} />
                <div>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>Alice</strong> completed task <span style={{ color: 'var(--primary)' }}>#42</span></p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Quick Actions</h2>
          <button className="btn-primary" style={{ width: '100%' }}>Create New Task</button>
          <button className="btn-secondary" style={{ width: '100%' }}>Invite Member</button>
          <button className="btn-secondary" style={{ width: '100%' }}>Project Settings</button>
        </div>
      </div>
    </div>
  );
}
