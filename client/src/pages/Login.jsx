import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
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
        className="login-illustration-panel"
      >
        <svg width="360" height="320" viewBox="0 0 360 320" style={{ position: 'relative', zIndex: 2 }}>
          <defs>
            <linearGradient id="card1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8eaff" />
            </linearGradient>
            <linearGradient id="card2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1e1b4b" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Back card */}
          <g filter="url(#softShadow)" transform="rotate(-8 130 150)">
            <rect x="40" y="90" width="180" height="120" rx="14" fill="url(#card2)" />
            <rect x="58" y="112" width="90" height="10" rx="5" fill="#ffffff" opacity="0.6" />
            <rect x="58" y="132" width="130" height="8" rx="4" fill="#ffffff" opacity="0.4" />
            <rect x="58" y="150" width="70" height="8" rx="4" fill="#ffffff" opacity="0.4" />
          </g>

          {/* Front card */}
          <g filter="url(#softShadow)" transform="rotate(6 200 170)">
            <rect x="130" y="110" width="190" height="130" rx="16" fill="url(#card1)" />
            <circle cx="158" cy="140" r="8" fill="#22c55e" />
            <rect x="176" y="134" width="100" height="10" rx="5" fill="#4338ca" opacity="0.8" />
            <rect x="150" y="160" width="150" height="8" rx="4" fill="#c7c9d1" />
            <rect x="150" y="178" width="110" height="8" rx="4" fill="#c7c9d1" />
            <rect x="150" y="205" width="70" height="24" rx="8" fill="#eef2ff" />
            <text x="163" y="221" fontSize="11" fill="#4338ca" fontFamily="Inter, sans-serif" fontWeight="600">
              Interview
            </text>
          </g>

          {/* Floating dots */}
          <circle cx="60" cy="60" r="6" fill="#ffffff" opacity="0.6" />
          <circle cx="320" cy="80" r="10" fill="#ffffff" opacity="0.4" />
          <circle cx="300" cy="260" r="7" fill="#ffffff" opacity="0.5" />
          <circle cx="45" cy="250" r="5" fill="#ffffff" opacity="0.5" />
        </svg>

        <h1 style={{ color: '#fff', fontSize: '26px', marginTop: '20px', textAlign: 'center' }}>
          Track every application,
          <br />
          land the right offer
        </h1>
        <p style={{ color: '#e0e0ff', fontSize: '14px', marginTop: '8px', textAlign: 'center', maxWidth: '320px' }}>
          Organize your job search like a pipeline — Applied, Interview, Offer, Rejected — all in one board.
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
            <h2 style={{ margin: 0, fontSize: '24px', color: '#1a1a2e' }}>Welcome back</h2>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#8a8f98' }}>
              Log in to continue tracking your applications
            </p>
          </div>

          <form onSubmit={handleSubmit}>
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
              Log In
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '20px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>
              Register
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

export default Login;