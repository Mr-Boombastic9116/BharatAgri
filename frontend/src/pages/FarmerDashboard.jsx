import React, { useEffect, useState } from 'react';
import { getFarmerBookings } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import AppointmentCard from '../components/AppointmentCard';
import { Calendar, PlusCircle, User, Hash, Clock, QrCode, X, Phone, MapPin } from 'lucide-react';
import { formatDateDisplay } from '../utils/dateUtils';

export default function FarmerDashboard({ user, navigate }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // QR Pass Modal state
  const [selectedPassBooking, setSelectedPassBooking] = useState(null);

  useEffect(() => {
    if (user && user.user_id) {
      getFarmerBookings(user.user_id)
        .then(data => setBookings(data))
        .catch(err => console.error('Error loading farmer bookings:', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const upcomingBooking = bookings.find(b => b.status === 'CONFIRMED' || b.status === 'ARRIVED' || b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.id !== (upcomingBooking ? upcomingBooking.id : null));

  return (
    <div className="farmer-dashboard">
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--secondary)' }}>
          Welcome, {user.name}
        </h1>
        <p style={{ fontSize: '0.95rem' }}>Farmer Procurement Dashboard</p>
      </div>

      {/* Basic Farmer Info Card */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>FARMER NAME</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--secondary)' }}>{user.name}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Hash size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>FARMER ID</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--secondary)' }}>{user.user_id}</div>
          </div>
        </div>

        {user.mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef9c3', color: '#854d0e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>MOBILE</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)' }}>{user.mobile}</div>
            </div>
          </div>
        )}
      </div>

      {/* Grid: Upcoming Appointment & Quick Action */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* UPCOMING APPOINTMENT CARD */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="var(--primary)" /> UPCOMING APPOINTMENT
            </h3>
            {upcomingBooking && <StatusBadge status={upcomingBooking.status} />}
          </div>

          {upcomingBooking ? (
            <div style={{ backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--primary-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--primary-hover)', fontSize: '1.1rem' }}>
                  {upcomingBooking.appointment_id || upcomingBooking.booking_id}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)' }}>{upcomingBooking.crop}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem 0.5rem', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>PROCUREMENT CENTRE</span>
                  <strong style={{ color: 'var(--secondary)' }}>{upcomingBooking.centre_name}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>QUANTITY</span>
                  <strong style={{ color: 'var(--secondary)' }}>{upcomingBooking.quantity} Quintals</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>DATE</span>
                  <strong style={{ color: 'var(--secondary)' }}>{formatDateDisplay(upcomingBooking.date)}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>TIME SLOT</span>
                  <strong style={{ color: 'var(--secondary)' }}>{upcomingBooking.time_slot}</strong>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
                onClick={() => setSelectedPassBooking(upcomingBooking)}
              >
                <QrCode size={16} /> VIEW QR PROCUREMENT PASS
              </button>
            </div>
          ) : (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--muted)' }}>
              <p>No active upcoming procurement appointment found.</p>
            </div>
          )}
        </div>

        {/* QUICK ACTION CTA */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <PlusCircle size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Book a Procurement Slot</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Reserve your time slot at a local procurement centre for fast verification.
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('book-slot')}
            style={{ width: '100%' }}
          >
            <PlusCircle size={20} /> Book Procurement Slot
          </button>
        </div>
      </div>

      {/* PAST APPOINTMENTS */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Appointment History</h3>
        </div>

        {loading ? (
          <p style={{ padding: '1rem' }}>Loading appointments...</p>
        ) : bookings.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--muted)' }}>No previous appointments recorded.</p>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Centre</th>
                  <th>Crop</th>
                  <th>Quantity (Quintals)</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th>Pass</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id || b.appointment_id}>
                    <td><strong style={{ color: 'var(--primary)' }}>{b.appointment_id || b.booking_id}</strong></td>
                    <td>{b.centre_name}</td>
                    <td>{b.crop}</td>
                    <td>{b.quantity} Quintals</td>
                    <td>{formatDateDisplay(b.date)}</td>
                    <td>{b.time_slot}</td>
                    <td><StatusBadge status={b.status} /></td>
                    <td>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedPassBooking(b)}
                        style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                      >
                        <QrCode size={12} /> View Pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QR PASS MODAL */}
      {selectedPassBooking && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '580px' }}>
            <button 
              onClick={() => setSelectedPassBooking(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 10,
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <AppointmentCard booking={selectedPassBooking} />
          </div>
        </div>
      )}
    </div>
  );
}
