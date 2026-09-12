const API_BASE = '/api';

export async function loginUser(userId, password, role) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, password, role })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data.user;
}

export async function registerFarmer(name, mobile, village, userId, password, preferredLanguage) {
  const res = await fetch(`${API_BASE}/farmers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      mobile,
      village,
      user_id: userId,
      password,
      preferred_language: preferredLanguage
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data.user;
}

export async function registerCentre(centreName, centreId, password, location, contactNumber, operatingDays, openingTime, closingTime, supportedCrops) {
  const res = await fetch(`${API_BASE}/centres/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      centre_name: centreName,
      centre_id: centreId,
      password,
      location,
      contact_number: contactNumber,
      operating_days: operatingDays,
      opening_time: openingTime,
      closing_time: closingTime,
      supported_crops: supportedCrops
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data.user;
}

export async function getCentres() {
  const res = await fetch(`${API_BASE}/centres`);
  if (!res.ok) throw new Error('Failed to fetch procurement centres');
  return res.json();
}

export async function getCentreDetails(centreId) {
  const res = await fetch(`${API_BASE}/centres/${encodeURIComponent(centreId)}`);
  if (!res.ok) throw new Error('Failed to fetch centre details');
  return res.json();
}

export async function getSlots(centreId, date) {
  const res = await fetch(`${API_BASE}/slots?centre_id=${encodeURIComponent(centreId)}&date=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error('Failed to fetch available slots');
  return res.json();
}

export async function createSlot(centreId, date, startTime, endTime, maxCapacity) {
  const res = await fetch(`${API_BASE}/slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      centre_id: centreId,
      date,
      start_time: startTime,
      end_time: endTime,
      max_capacity: maxCapacity
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create slot');
  return data.slot;
}

export async function updateSlotCapacity(slotId, maxCapacity) {
  const res = await fetch(`${API_BASE}/slots/${encodeURIComponent(slotId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ max_capacity: maxCapacity })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update slot capacity');
  return data;
}

export async function deleteSlot(slotId) {
  const res = await fetch(`${API_BASE}/slots/${encodeURIComponent(slotId)}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete slot');
  return data;
}

export async function copySchedule(centreId, sourceDate, targetDates) {
  const res = await fetch(`${API_BASE}/slots/copy-schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      centre_id: centreId,
      source_date: sourceDate,
      target_dates: targetDates
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to copy schedule');
  return data;
}

export async function bookSlot(farmerId, centreId, slotId, crop, quantity) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      farmer_id: farmerId,
      centre_id: centreId,
      slot_id: slotId,
      crop,
      quantity
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to book slot');
  return data.booking;
}

export async function getFarmerBookings(farmerId) {
  const res = await fetch(`${API_BASE}/bookings/farmer/${encodeURIComponent(farmerId)}`);
  if (!res.ok) throw new Error('Failed to fetch farmer bookings');
  return res.json();
}

export async function getCentreBookings(centreId, date) {
  let url = `${API_BASE}/bookings/centre/${encodeURIComponent(centreId)}`;
  if (date) {
    url += `?date=${encodeURIComponent(date)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch centre bookings');
  return res.json();
}


export async function updateBookingStatus(bookingId, status) {
  const res = await fetch(`${API_BASE}/bookings/${encodeURIComponent(bookingId)}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update booking status');
  return data;
}

export async function verifyQrToken(qrToken, centreId) {
  const res = await fetch(`${API_BASE}/appointments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qr_token: qrToken, centre_id: centreId })
  });
  const data = await res.json();
  return data;
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch statistics');
  return res.json();
}

export async function getOperatingConfig(centreId) {
  const res = await fetch(`${API_BASE}/centres/${encodeURIComponent(centreId)}/operating-config`);
  if (!res.ok) throw new Error('Failed to fetch operating config');
  return res.json();
}

export async function updateOperatingDays(centreId, operatingDays) {
  const payload = Array.isArray(operatingDays) ? operatingDays.join(',') : operatingDays;
  const res = await fetch(`${API_BASE}/centres/${encodeURIComponent(centreId)}/operating-days`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operating_days: payload })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update operating days');
  return data;
}

export async function addNonOperationalDate(centreId, date, reason) {
  const res = await fetch(`${API_BASE}/centres/${encodeURIComponent(centreId)}/non-operational-dates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, reason })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to add non-operational date');
  return data;
}

export async function removeNonOperationalDate(centreId, date) {
  const res = await fetch(`${API_BASE}/centres/${encodeURIComponent(centreId)}/non-operational-dates/${encodeURIComponent(date)}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to remove non-operational date');
  return data;
}

export async function getDailyCapacity(centreId, date) {
  const res = await fetch(`${API_BASE}/daily-capacity?centre_id=${encodeURIComponent(centreId)}&date=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error('Failed to fetch daily capacity');
  return res.json();
}

export async function updateDailyCapacity(centreId, date, maxQuintalsPerDay) {
  const res = await fetch(`${API_BASE}/daily-capacity`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ centre_id: centreId, date, max_quintals_per_day: maxQuintalsPerDay })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update daily capacity');
  return data;
}

export async function applyScheduleRange(centreId, startDate, endDate, timeSlots, maxQuintalsPerDay) {
  const res = await fetch(`${API_BASE}/slots/apply-schedule-range`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      centre_id: centreId,
      start_date: startDate,
      end_date: endDate,
      time_slots: timeSlots,
      max_quintals_per_day: maxQuintalsPerDay
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to apply schedule range');
  return data;
}

