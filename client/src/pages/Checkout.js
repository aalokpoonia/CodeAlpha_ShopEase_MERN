import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout({ cart, setCart }) {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: '', city: '', pincode: '', phone: '' });
  const [countdown, setCountdown] = useState(10);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [success, navigate]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(form.phone)) {
      setError('Phone Number must be exactly 10 digits.');
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError('Pincode must be exactly 6 digits.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId: user.id,
        products: cart,
        amount: total,
        address: form,
        status: 'pending'
      }, { headers: { Authorization: `Bearer ${token}` } });
      setCart([]);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Order failed!');
    }
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: 12, padding: 48, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: 450, width: '100%' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Order Placed!</h2>
        <p style={{ color: '#64748b', marginBottom: 24 }}>Your order has been recorded successfully.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <button onClick={() => navigate('/')}
            style={{ width: '100%', padding: '12px 0', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            🛒 Go to Dashboard / Home
          </button>
          <button onClick={() => navigate('/orders')}
            style={{ width: '100%', padding: '12px 0', background: 'transparent', color: '#0f172a', border: '1.5px solid #cbd5e1', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.background = '#f8fafc'}
            onMouseLeave={e => e.target.style.background = 'transparent'}>
            📦 View Order History
          </button>
        </div>

        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
          Redirecting to home dashboard in <span style={{ fontWeight: 700, color: '#0f172a' }}>{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#0f172a', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span onClick={() => navigate('/')} style={{ color: 'white', fontWeight: 800, fontSize: 20, cursor: 'pointer' }}><span style={{ color: '#3b82f6' }}>Shop</span>Ease</span>
          <span style={{ color: '#64748b', marginLeft: 16, fontSize: 14 }}>/ Checkout</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Hello, <span style={{ color: 'white', fontWeight: 600 }}>{user?.name}</span></div>
          <button onClick={() => navigate('/profile')}
            style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
            onMouseEnter={e => e.target.style.color = '#3b82f6'}
            onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
            👤 Profile
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

      <div style={{ maxWidth: 900, margin: '32px auto', padding: '0 24px', display: 'flex', gap: 24 }}>
        {/* Form */}
        <div style={{ flex: 1 }}>
          <div style={{ background: 'white', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Delivery Details</h2>
            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}
            <form onSubmit={handleOrder}>
              {[['address', 'Delivery Address', 'text'], ['city', 'City', 'text'], ['pincode', 'Pincode', 'text'], ['phone', 'Phone Number', 'tel']].map(([field, label, type]) => (
                <div key={field} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                  <input type={type} required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px 0', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>
                {loading ? 'Placing Order...' : `Place Order — ₹${total.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ width: 280 }}>
          <div style={{ background: 'white', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                <span style={{ color: '#374151' }}>{item.emoji} {item.name} x{item.qty}</span>
                <span style={{ fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontWeight: 700, fontSize: 16 }}>
              <span>Total</span>
              <span style={{ color: '#0f172a' }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}