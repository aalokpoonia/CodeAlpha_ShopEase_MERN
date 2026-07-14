import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@swasthsetu.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) await login(email, password);
      else await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Left Panel */}
      <div style={{ width: '45%', background: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(59,130,246,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, borderRadius: '50%', background: 'rgba(16,185,129,0.06)' }} />
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #3b82f6, #10b981)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🛍️</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>ShopEase</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>E-Commerce Platform</div>
            </div>
          </div>
          <h1 style={{ color: 'white', fontSize: 36, fontWeight: 700, lineHeight: 1.2, margin: '0 0 16px' }}>Shop smarter,<br />not harder.</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7, margin: 0 }}>Discover thousands of products with seamless checkout, real-time order tracking, and personalized recommendations.</p>
        </div>
        {[['🛒', 'Smart Cart Management', 'Add, remove and manage items easily'],
          ['📦', 'Real-time Order Tracking', 'Track your orders from placement to delivery'],
          ['🔒', 'Secure Payments', 'Your data is always safe with us']].map(([icon, title, desc]) => (
          <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{desc}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 40, color: '#334155', fontSize: 12 }}>ShopEase v1.0 · Secure Platform</div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{isLogin ? 'Sign in to your account' : 'Create your account'}</h2>
          <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 32px' }}>{isLogin ? 'Enter your credentials to continue shopping.' : 'Join ShopEase and start shopping today.'}</p>

          <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {['Login', 'Sign Up'].map((tab, i) => (
              <button key={tab} onClick={() => setIsLogin(i === 0)}
                style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                  background: (isLogin ? i === 0 : i === 1) ? 'white' : 'transparent',
                  color: (isLogin ? i === 0 : i === 1) ? '#0f172a' : '#64748b',
                  boxShadow: (isLogin ? i === 0 : i === 1) ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                {tab}
              </button>
            ))}
          </div>

          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' }} />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' }} />
            </div>
            <button type="submit"
              style={{ width: '100%', padding: '13px 0', background: '#0f172a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              {isLogin ? 'Sign in →' : 'Create Account →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;