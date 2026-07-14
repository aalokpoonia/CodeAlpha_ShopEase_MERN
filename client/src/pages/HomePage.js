import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PRODUCTS from '../data/products';

const CATEGORIES = [
  { name: 'All', icon: '⊞' },
  { name: 'Phones', icon: '▣' },
  { name: 'Laptops', icon: '▤' },
  { name: 'Shoes', icon: '◈' },
  { name: 'Clothing', icon: '◉' },
  { name: 'Other', icon: '◎' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 – ₹20,000', min: 5000, max: 20000 },
  { label: '₹20,000 – ₹50,000', min: 20000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: Infinity },
];

export default function HomePage({ cart, setCart }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState('');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500); }

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }

  function removeFromCart(id) { setCart(prev => prev.filter(i => i.id !== id)); }
  function changeQty(id, delta) { setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)); }
  function toggleWishlist(product) {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) { showToast('Removed from wishlist'); return prev.filter(i => i.id !== product.id); }
      showToast('Added to wishlist'); return [...prev, product];
    });
  }

  const range = PRICE_RANGES[priceRange];
  let filtered = PRODUCTS.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    p.price >= range.min && p.price <= range.max
  );
  if (sortBy === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, sans-serif' }}>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0f172a', color: 'white', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{toast}</div>}

      {/* Navbar */}
      <div style={{ background: '#0f172a', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ color: 'white', fontWeight: 800, fontSize: 20, whiteSpace: 'nowrap' }}>
            <span style={{ color: '#3b82f6' }}>Shop</span>Ease
          </div>
          <div style={{ flex: 1, display: 'flex', background: 'white', borderRadius: 4, overflow: 'hidden' }}>
            <input type="text" placeholder="Search for products, brands and more..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, padding: '10px 16px', border: 'none', fontSize: 14, outline: 'none' }} />
            <button style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Search</button>
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
            <button onClick={() => setShowCart(!showCart)}
              style={{ background: 'transparent', border: '1.5px solid #334155', color: 'white', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              Cart {cartCount > 0 && <span style={{ background: '#3b82f6', borderRadius: 99, padding: '1px 7px', fontSize: 11 }}>{cartCount}</span>}
            </button>
            <button onClick={logout} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Logout</button>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div style={{ background: '#1e293b', padding: '0 24px', borderBottom: '1px solid #334155' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', gap: 4 }}>
          {CATEGORIES.map(c => (
            <button key={c.name} onClick={() => setCategory(c.name)}
              style={{ padding: '10px 18px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, background: 'transparent', color: category === c.name ? 'white' : '#94a3b8', borderBottom: category === c.name ? '2px solid #3b82f6' : '2px solid transparent' }}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '20px 24px', display: 'flex', gap: 20 }}>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filters</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 10, textTransform: 'uppercase' }}>Price Range</div>
              {PRICE_RANGES.map((r, i) => (
                <div key={i} onClick={() => setPriceRange(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${priceRange === i ? '#3b82f6' : '#cbd5e1'}`, background: priceRange === i ? '#3b82f6' : 'white', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: priceRange === i ? '#0f172a' : '#64748b', fontWeight: priceRange === i ? 600 : 400 }}>{r.label}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 10, textTransform: 'uppercase' }}>Sort By</div>
              {[['default', 'Relevance'], ['low', 'Price: Low to High'], ['high', 'Price: High to Low'], ['rating', 'Top Rated']].map(([val, label]) => (
                <div key={val} onClick={() => setSortBy(val)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${sortBy === val ? '#3b82f6' : '#cbd5e1'}`, background: sortBy === val ? '#3b82f6' : 'white', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: sortBy === val ? '#0f172a' : '#64748b', fontWeight: sortBy === val ? 600 : 400 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          {wishlist.length > 0 && (
            <div style={{ background: 'white', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', marginBottom: 12, textTransform: 'uppercase' }}>Wishlist ({wishlist.length})</div>
              {wishlist.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 12, color: '#374151' }}>{item.emoji} {item.name}</span>
                  <button onClick={() => toggleWishlist(item)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
            Showing <span style={{ fontWeight: 600, color: '#0f172a' }}>{filtered.length}</span> results
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}>
                <div style={{ position: 'relative' }}>
                  <div style={{ background: '#f8fafc', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>{p.emoji}</div>
                  <button onClick={() => toggleWishlist(p)}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 14, boxShadow: '0 2px 6px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {wishlist.some(i => i.id === p.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div style={{ padding: '12px 14px 14px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 6 }}>
                    {'★'.repeat(Math.round(p.rating))}{'☆'.repeat(5 - Math.round(p.rating))}
                    <span style={{ color: '#94a3b8', marginLeft: 4 }}>({p.reviews})</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>₹{p.price.toLocaleString()}</div>
                  <button onClick={() => addToCart(p)}
                    style={{ width: '100%', padding: '9px 0', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        {showCart && (
          <div style={{ width: 300, flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: 84 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 16, paddingBottom: 12, borderBottom: '2px solid #f1f5f9' }}>
                Your Cart {cartCount > 0 && <span style={{ color: '#3b82f6' }}>({cartCount})</span>}
              </div>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#94a3b8' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>◎</div>
                  <div style={{ fontSize: 13 }}>Your cart is empty</div>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: 28 }}>{item.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 700, marginBottom: 6 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button onClick={() => changeQty(item.id, -1)} style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>−</button>
                          <span style={{ fontSize: 13, fontWeight: 600, minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} style={{ width: 22, height: 22, borderRadius: 4, border: 'none', background: '#0f172a', color: 'white', cursor: 'pointer' }}>+</button>
                          <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 4, width: 22, height: 22, borderRadius: 4, border: 'none', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}>✕</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>Total</span>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: 18 }}>₹{total.toLocaleString()}</span>
                    </div>
                    <button onClick={() => navigate('/checkout')}
                      style={{ width: '100%', padding: '12px 0', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}