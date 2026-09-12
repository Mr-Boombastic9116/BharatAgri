import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import FarmerDashboard from './pages/FarmerDashboard';
import CentreDashboard from './pages/CentreDashboard';
import SlotBookingPage from './pages/SlotBookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

export default function App() {
  // Navigation active page
  const [activePage, setActivePage] = useState('home');
  const [initialLoginRole, setInitialLoginRole] = useState('farmer');

  // User state persisted in localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bharatagri_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Active booking for confirmation view
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const navigate = (page, options = {}) => {
    if (options.role) {
      setInitialLoginRole(options.role);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('bharatagri_user', JSON.stringify(userData));
    if (userData.role === 'farmer') {
      navigate('farmer-dashboard');
    } else {
      navigate('centre-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bharatagri_user');
    navigate('home');
  };

  const handleBookingSuccess = (bookingData) => {
    setConfirmedBooking(bookingData);
    navigate('booking-confirmation');
  };

  return (
    <div className="app-container">
      <Navbar 
        user={user} 
        activePage={activePage} 
        navigate={navigate} 
        onLogout={handleLogout} 
      />

      <main className="main-content">
        <div className="container">
          {activePage === 'home' && (
            <HomePage navigate={navigate} />
          )}

          {activePage === 'about' && (
            <AboutUsPage navigate={navigate} />
          )}


          {activePage === 'login' && (
            <LoginPage 
              initialRole={initialLoginRole} 
              onLoginSuccess={handleLoginSuccess}
              navigate={navigate}
            />
          )}

          {activePage === 'farmer-dashboard' && user && user.role === 'farmer' && (
            <FarmerDashboard 
              user={user} 
              navigate={navigate} 
            />
          )}

          {activePage === 'centre-dashboard' && user && user.role === 'centre' && (
            <CentreDashboard 
              user={user} 
            />
          )}

          {activePage === 'book-slot' && user && user.role === 'farmer' && (
            <SlotBookingPage 
              user={user} 
              onBookingSuccess={handleBookingSuccess}
              navigate={navigate}
            />
          )}

          {activePage === 'booking-confirmation' && (
            <BookingConfirmationPage 
              booking={confirmedBooking} 
              navigate={navigate} 
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
