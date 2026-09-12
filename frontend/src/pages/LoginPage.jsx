import React, { useState } from 'react';
import { loginUser, registerFarmer, registerCentre } from '../services/api';
import { LogIn, UserCheck, Building2, User, AlertCircle } from 'lucide-react';

export default function LoginPage({ initialRole = 'farmer', onLoginSuccess }) {
  const [role, setRole] = useState(initialRole);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration State
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regId, setRegId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLanguage, setRegLanguage] = useState('English');

  // Centre Register State
  const [regLocation, setRegLocation] = useState('Ponda, Goa');
  const [regContact, setRegContact] = useState('9876543210');
  const [regOperatingDays, setRegOperatingDays] = useState('Monday,Tuesday,Wednesday,Thursday,Friday,Saturday');
  const [regOpeningTime, setRegOpeningTime] = useState('09:00 AM');
  const [regClosingTime, setRegClosingTime] = useState('05:00 PM');
  const [regCrops, setRegCrops] = useState('Paddy,Wheat,Maize,Cotton');

  // Error & Loading States
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password.');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(userId.trim(), password, role);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!regName.trim()) {
      setError(role === 'farmer' ? 'Please enter Full Name.' : 'Please enter Centre Name.');
      return;
    }

    if (!regId.trim()) {
      setError(role === 'farmer' ? 'Please enter Farmer ID.' : 'Please enter Centre ID.');
      return;
    }

    if (!regPassword.trim()) {
      setError('Please enter a password.');
      return;
    }

    setLoading(true);
    try {
      let registeredUser;
      if (role === 'farmer') {
        if (!regMobile.trim() || !regVillage.trim()) {
          setError('Mobile number and Village/Locality are required for Farmer registration.');
          setLoading(false);
          return;
        }
        registeredUser = await registerFarmer(
          regName.trim(),
          regMobile.trim(),
          regVillage.trim(),
          regId.trim(),
          regPassword,
          regLanguage
        );
      } else {
        if (!regLocation.trim() || !regContact.trim()) {
          setError('Location and Contact Number are required for Centre registration.');
          setLoading(false);
          return;
        }
        registeredUser = await registerCentre(
          regName.trim(),
          regId.trim(),
          regPassword,
          regLocation.trim(),
          regContact.trim(),
          regOperatingDays,
          regOpeningTime,
          regClosingTime,
          regCrops.trim()
        );
      }
      
      onLoginSuccess(registeredUser);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: isRegistering ? '560px' : '440px', margin: '2rem auto', width: '100%', transition: 'all 0.3s' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            BHARATAGRI
          </h2>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)' }}>
            {isRegistering ? `Register ${role === 'farmer' ? 'Farmer Profile' : 'Procurement Centre'}` : 'Login to BharatAgri'}
          </h3>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Role Selection */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1.5rem',
          padding: '0.35rem',
          backgroundColor: '#f1f5f9',
          borderRadius: 'var(--radius-md)'
        }}>
          <label style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '0.6rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            backgroundColor: role === 'farmer' ? '#ffffff' : 'transparent',
            color: role === 'farmer' ? 'var(--primary)' : 'var(--muted)',
            boxShadow: role === 'farmer' ? 'var(--shadow-sm)' : 'none'
          }}>
            <input 
              type="radio" 
              name="role" 
              value="farmer" 
              checked={role === 'farmer'} 
              onChange={() => { setRole('farmer'); setError(''); }}
              style={{ display: 'none' }}
            />
            <User size={16} /> Farmer
          </label>

          <label style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '0.6rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            backgroundColor: role === 'centre' ? '#ffffff' : 'transparent',
            color: role === 'centre' ? 'var(--primary)' : 'var(--muted)',
            boxShadow: role === 'centre' ? 'var(--shadow-sm)' : 'none'
          }}>
            <input 
              type="radio" 
              name="role" 
              value="centre" 
              checked={role === 'centre'} 
              onChange={() => { setRole('centre'); setError(''); }}
              style={{ display: 'none' }}
            />
            <Building2 size={16} /> Procurement Centre
          </label>
        </div>

        {!isRegistering ? (
          /* Login Form */
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                {role === 'farmer' ? 'Farmer ID' : 'Centre ID'}
              </label>
              <input 
                type="text"
                className="form-control"
                placeholder={role === 'farmer' ? 'e.g. FARMER-101' : 'e.g. CENTRE-001'}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={loading}
            >
              <LogIn size={18} /> {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegister}>
            {role === 'farmer' ? (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="e.g. Ramesh Kumar"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. 9823012345"
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Village / Locality</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ponda"
                      value={regVillage}
                      onChange={(e) => setRegVillage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Farmer ID</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. FARMER-106"
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Language</label>
                    <select
                      className="form-control"
                      value={regLanguage}
                      onChange={(e) => setRegLanguage(e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Konkani">Konkani</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Centre Name</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. Central Procurement Yard"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Centre ID</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. CENTRE-004"
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. Panaji, Goa"
                      value={regLocation}
                      onChange={(e) => setRegLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="e.g. 9876543210"
                      value={regContact}
                      onChange={(e) => setRegContact(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Supported Crop Categories</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="e.g. Paddy,Wheat,Maize,Cotton"
                    value={regCrops}
                    onChange={(e) => setRegCrops(e.target.value)}
                    required
                  />
                  <small style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Comma separated crops supported by centre</small>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password"
                className="form-control"
                placeholder="Create password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={loading}
            >
              <UserCheck size={18} /> {loading ? 'Registering...' : 'Register Account'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          {!isRegistering ? (
            <p style={{ fontSize: '0.9rem' }}>
              Don't have an account?{' '}
              <span 
                onClick={() => { setIsRegistering(true); setError(''); }} 
                style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Register
              </span>
            </p>
          ) : (
            <p style={{ fontSize: '0.9rem' }}>
              Already registered?{' '}
              <span 
                onClick={() => { setIsRegistering(false); setError(''); }} 
                style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
