import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Orders() {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = user?.id || user?._id;
                if (!userId) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`http://localhost:5000/api/orders/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Sort orders check by descending date (newest first)
                const sortedOrders = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch orders.');
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user, token]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return { bg: '#e8f5e9', text: '#2e7d32' };
            case 'processing': return { bg: '#e3f2fd', text: '#1565c0' };
            case 'pending': return { bg: '#fff8e1', text: '#f57f17' };
            case 'cancelled': return { bg: '#ffebee', text: '#c62828' };
            default: return { bg: '#f5f5f5', text: '#616161' };
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, sans-serif' }}>
            {/* Navbar */}
            <div style={{ background: '#0f172a', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span onClick={() => navigate('/')} style={{ color: 'white', fontWeight: 800, fontSize: 20, cursor: 'pointer' }}><span style={{ color: '#3b82f6' }}>Shop</span>Ease</span>
                    <span style={{ color: '#64748b', marginLeft: 16, fontSize: 14 }}>/ My Orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>Hello, <span style={{ color: 'white', fontWeight: 600 }}>{user?.name}</span></div>
                    <button onClick={() => navigate('/')}
                        style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => e.target.style.color = '#3b82f6'}
                        onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                        🏠 Shop Home
                    </button>
                    <button onClick={() => navigate('/profile')}
                        style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => e.target.style.color = '#3b82f6'}
                        onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                        👤 Profile
                    </button>
                    <button onClick={logout}
                        style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Order View Container */}
            <div style={{ maxWidth: 850, margin: '32px auto', padding: '0 24px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Order History</h2>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>Loading your orders...</div>
                ) : error ? (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '14px', borderRadius: 8, fontSize: 14 }}>{error}</div>
                ) : orders.length === 0 ? (
                    <div style={{ background: 'white', borderRadius: 12, padding: '48px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>No Orders Placed Yet</h3>
                        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Explore our catalog and place your first order!</p>
                        <button onClick={() => navigate('/')}
                            style={{ padding: '10px 24px', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {orders.map(order => {
                            const statusColor = getStatusColor(order.status);
                            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            });

                            return (
                                <div key={order._id} style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #cbd5e1' }}>
                                    {/* Order Header info */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 16, marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                                        <div>
                                            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Order ID</div>
                                            <div style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 600, color: '#0f172a', marginTop: 2 }}>{order._id}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Placed On</div>
                                            <div style={{ fontSize: 13, fontWeight: 500, color: '#334155', marginTop: 2 }}>{formattedDate}</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: statusColor.bg, color: statusColor.text, textTransform: 'uppercase' }}>
                                                {order.status || 'pending'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Items list */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {order.products.map((item, idx) => (
                                            <div key={item.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <span style={{ fontSize: 24 }}>{item.emoji || '🛍️'}</span>
                                                    <div>
                                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                                                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Qty: {item.qty} × ₹{item.price?.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                                                    ₹{(item.price * item.qty).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer info */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 16, marginTop: 16 }}>
                                        <div>
                                            {order.address && (
                                                <div style={{ fontSize: 12, color: '#64748b' }}>
                                                    Deliver to: <span style={{ fontWeight: 600, color: '#334155' }}>{order.address.address}, {order.address.city} - {order.address.pincode}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Total Amount</div>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: '#3b82f6', marginTop: 2 }}>₹{order.amount?.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
