import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in", email);
    // Simulate login and redirect
    navigate('/dashboard');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '64px', height: '64px', margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
          }}>
            <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>T</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            <span style={{ color: 'var(--primary)' }}>Team</span>Sync
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Sign in to continue to your workspace</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>Password</label>
              <a href="#" style={{ fontSize: '0.85rem' }}>Forgot password?</a>
            </div>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '0.875rem' }}>
            <LogIn size={20} />
            Sign In
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-color)', zIndex: 1 }}></div>
          <span style={{ position: 'relative', zIndex: 2, background: 'var(--bg-card)', padding: '0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Or continue with
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn-secondary">GitHub</button>
          <button className="btn-secondary">Google</button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: '500' }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
