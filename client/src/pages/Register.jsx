import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data);
      navigate('/board');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* LEFT: Illustration panel */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg width="360" height="320" viewBox="0 0 360 320" style={{ position: 'relative', zIndex: 2 }}>
          <defs>
            <linearGradient id="rcard1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8eaff" />
            </linearGradient>
            <linearGradient id="rcard2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <filter id="rSoftShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1e1b4b" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Back card - green "Offer" themed */}
          <g filter="url(#rSoftShadow)" transform="rotate(-7 130 150)">
            <rect x="35" y="95" width="180" height="120" rx="14" fill="url(#rcard2)" />
            <rect x="53" y="117" width="90" height="10" rx="5" fill="#ffffff" opacity="0.7" />
            <rect x="53" y="137" width="130" height="8" rx="4" fill="#ffffff" opacity="0.5" />
            <rect x="53" y="155" width="70" height="8" rx="4" fill="#ffffff" opacity="0.5" />
          </g>

          {/* Front card - checklist style */}
          <g filter="url(#rSoftShadow)" transform="rotate(5 200 170)">
            <rect x="130" y="105" width="190" height="140" rx="16" fill="url(#rcard1)" />
            <circle cx="156" cy="134" r="8" fill="#6366f1" />
            <rect x="174" y="128" width="100" height="10" rx="5" fill="#4338ca" opacity="0.8" />

            <circle cx="156" cy="164" r="6" fill="#22c55e" />
            <rect x="170" y="159" width="120" height="8" rx="4" fill="#c7c9d1" />

            <circle cx="156" cy="186" r="6" fill="#22c55e" />
            <rect x="170" y="181" width="90" height="8" rx="4" fill="#c7c9d1" />

            <circle cx="156" cy="208" r="6" fill="#e5e7eb" />
            <rect x="170" y="203" width="110" height="8" rx="4" fill="#e5e7eb" />

            <rect x="150" y="222" width="80" height="24" rx="8" fill="#ecfdf5" />
            <text x="163" y="238" fontSize="11" fill="#047857" fontFamily="Inter, sans-serif" fontWeight="600">
              Offer 🎉
            </text>
          </g>

          <circle cx="55" cy="55" r="6" fill="#ffffff" opacity="0.6" />
          <circle cx="320" cy="85" r="10" fill="#ffffff" opacity="0.4" />
          <circle cx="305" cy="265" r="7" fill="#ffffff" opacity="0.5" />
          <circle cx="45" cy="245" r="5" fill="#ffffff" opacity="0.5" />
        </svg>

        <h1 style={{ color: '#fff', fontSize: '26px', marginTop: '20px', textAlign: 'center' }}>
          Start your job search,
          <br />
          stay organized from day one
        </h1>
        <p style={{ color: '#e0e0ff', fontSize: '14px', marginTop: '8px', textAlign: 'center', maxWidth: '320px' }}>
          Create your free board and never lose track of an application again.
        </p>
      </div>

      {/* RIGHT: Form panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          padding: '20px',
        }}
      >
        <div style={{ width: '380px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#1a1a2e' }}>Create your account</h2>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#8a8f98' }}>
              Set up your board in less than a minute
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  color: '#b91c1c',
                  fontSize: '13px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                {error}
              </div>
            )}

            <button type="submit" style={buttonStyle}>
              Create Account
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '20px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  marginTop: '6px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 600,
  cursor: 'pointer',
};

export default Register;