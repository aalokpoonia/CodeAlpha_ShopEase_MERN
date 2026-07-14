import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, sans-serif' }}>
            {/* Navbar */}
            <div style={{ background: '#0f172a', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span onClick={() => navigate('/')} style={{ color: 'white', fontWeight: 800, fontSize: 20, cursor: 'pointer' }}><span style={{ color: '#3b82f6' }}>Shop</span>Ease</span>
                    <span style={{ color: '#64748b', marginLeft: 16, fontSize: 14 }}>/ My Profile</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>Hello, <span style={{ color: 'white', fontWeight: 600 }}>{user?.name}</span></div>
                    <button onClick={() => navigate('/')}
                        style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => e.target.style.color = '#3b82f6'}
                        onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                        🏠 Shop Home
                    </button>
                    <button onClick={() => navigate('/orders')}
                        style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => e.target.style.color = '#3b82f6'}
                        onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                        📦 My Orders
                    </button>
                    <button onClick={logout}
                        style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Profile Details Card */}
            <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 24px' }}>
                <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30, borderBottom: '1px solid #f1f5f9', paddingBottom: 24 }}>
                        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'white', fontWeight: 700 }}>
                            {user?.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{user?.name}</h2>
                            <span style={{ fontSize: 13, color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: 99, fontWeight: 600 }}>Active Account</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginTop: 4 }}>{user?.name || 'N/A'}</div>
                        </div>

                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginTop: 4 }}>{user?.email || 'N/A'}</div>
                        </div>

                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>User ID</label>
                            <div style={{ fontSize: 13, fontFamily: 'monospace', color: '#334155', marginTop: 4, background: '#f8fafc', padding: '8px 12px', borderRadius: 6, border: '1px solid #e2e8f0' }}>
                                {user?.id || user?._id || 'N/A'}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                        <button onClick={() => navigate('/')}
                            style={{ flex: 1, padding: '12px 0', background: '#0f172a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                            Go Shopping
                        </button>
                        <button onClick={() => navigate('/orders')}
                            style={{ flex: 1, padding: '12px 0', background: 'transparent', color: '#0f172a', border: '1.5px solid #cbd5e1', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
                            onMouseEnter={e => e.target.style.background = '#f8fafc'}
                            onMouseLeave={e => e.target.style.background = 'transparent'}>
                            View My Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
