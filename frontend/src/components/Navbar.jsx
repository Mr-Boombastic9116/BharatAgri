import React from 'react';
import { Sprout, LogOut, LogIn, Home, Info, User, Building2, Calendar, LayoutDashboard } from 'lucide-react';

export default function Navbar({ user, activePage, navigate, onLogout }) {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="brand-logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo-icon">
            <Sprout size={22} />
          </div>
          <span>BHARAT<span className="brand-accent">AGRI</span></span>
        </div>

        <nav>
          <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: 0, listStyle: 'none' }}>
            <li 
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => navigate('home')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Home size={16} /> Home
              </span>
            </li>

            <li 
              className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => navigate('about')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Info size={16} /> About Us
              </span>
            </li>

            {user ? (
              <>
                <li 
                  className={`nav-link ${(activePage === 'farmer-dashboard' || activePage === 'centre-dashboard') ? 'active' : ''}`}
                  onClick={() => navigate(user.role === 'farmer' ? 'farmer-dashboard' : 'centre-dashboard')}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {user.role === 'farmer' ? <User size={16} /> : <Building2 size={16} />} Dashboard
                  </span>
                </li>

                {user.role === 'farmer' && (
                  <li 
                    className={`nav-link ${activePage === 'book-slot' ? 'active' : ''}`}
                    onClick={() => navigate('book-slot')}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} /> Book Slot
                    </span>
                  </li>
                )}

                <li>
                  <div className="user-badge" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{user.name} ({user.user_id})</span>
                    <button 
                      onClick={onLogout} 
                      className="btn btn-outline btn-sm" 
                      title="Logout"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px' }}
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <li 
                className={`nav-link ${activePage === 'login' ? 'active' : ''}`}
                onClick={() => navigate('login')}
              >
                <button className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <LogIn size={14} /> Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

