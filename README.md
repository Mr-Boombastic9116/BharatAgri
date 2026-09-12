# BHARATAGRI

### Digital Appointment & Entry Management for Agricultural Centres

BHARATAGRI is a web-based platform designed to make visits to agricultural procurement centres more organized.

Instead of relying on manual scheduling, farmers can select a centre, choose an available date and time slot, provide basic crop and quantity details, and receive a digital appointment pass with a unique QR code.

Procurement centres can manage their operating schedule, control daily and time-slot capacity, view appointments, and verify farmer appointments by scanning the QR code.

The prototype focuses specifically on **appointment scheduling, capacity management, and verified entry**.

---

## Problem

Farmers visiting agricultural centres may not have a simple way to know when they can visit or whether a centre has available capacity.

At the same time, centre staff need to manage:

* Available operating dates
* Time slots
* Daily capacity
* Number of farmers per slot
* Appointment records
* Entry verification

When these activities are handled manually, coordinating visits can become unnecessarily difficult.

BHARATAGRI provides a single digital system for managing this appointment process.

---

## Solution

BHARATAGRI connects farmers and agricultural procurement centres through two role-based interfaces.

### Farmer

Farmers can:

* Create a basic profile
* View available procurement centres
* Select an available date
* Select a time slot
* Enter crop and estimated quantity
* Confirm an appointment
* Receive a unique QR-based appointment pass
* View upcoming and previous appointments

### Procurement Centre

Centres can:

* Register and manage centre information
* Define operational days
* Configure non-operational dates
* Create schedules for date ranges
* Configure time slots
* Set maximum farmers per time slot
* Set maximum Quintals per day
* Modify schedules for individual dates
* View date-specific appointments
* View crop-wise booking and quantity summaries
* Manage appointment statuses
* Verify appointments using QR scanning

---

# Key Features

## 1. Date-Based Slot Management

Procurement centres can configure appointment schedules according to their operating calendar.

The system supports:

* Operational days
* Non-operational dates
* Date ranges
* Individual date modifications
* Time slots
* Slot-wise farmer capacity
* Daily Quintal capacity

This allows centres to create a schedule once for a range of dates and make changes to individual dates when required.

---

## 2. Capacity Management

BHARATAGRI manages capacity at two levels.

### Daily Capacity

Centres can define the maximum quantity they can handle per day in **Quintals**.

The system calculates:

**Remaining Capacity = Daily Capacity − Booked Quantity**

### Time-Slot Capacity

Centres can also define the maximum number of farmers allowed in each time slot.

For example:

| Time        |   Capacity |
| ----------- | ---------: |
| 09:00–10:00 | 20 Farmers |
| 10:00–11:00 | 20 Farmers |
| 11:00–12:00 | 15 Farmers |

Once a slot reaches its limit, it becomes unavailable for new bookings.

---

## 3. Farmer Appointment Booking

Farmers select:

1. Procurement centre
2. Date
3. Available time slot
4. Crop
5. Estimated quantity

The system checks availability before confirming the appointment.

This helps prevent overbooking and keeps appointment information organized.

---

## 4. QR-Based Appointment Pass

After a successful booking, BHARATAGRI generates a unique appointment ID and QR code.

The digital pass contains relevant appointment information such as:

* Farmer
* Appointment ID
* Centre
* Date
* Time
* Crop
* Estimated quantity

The farmer can present the QR code when arriving at the centre.

---

## 5. QR Appointment Verification

Procurement centre staff can open the QR verification interface and scan the farmer's appointment QR code.

The scanner follows a controlled flow:

**Scan → Verify → Stop Camera → Display Result**

After verification, the camera remains off until the staff member selects:

**Verify Another QR Code**

This prevents repeated scanning of the same QR code.

---

## 6. Date-Based Centre Overview

The Procurement Centre Overview allows staff to select a specific date and view information for that day.

The dashboard can display:

* Daily Quintal capacity
* Booked Quintals
* Remaining Quintals
* Booking capacity
* Available booking capacity
* Crop-wise booking totals
* Crop-wise Quintal totals
* Time-slot usage

### Example

| Crop      | Bookings |   Total Quantity |
| --------- | -------: | ---------------: |
| Paddy     |       12 |     180 Quintals |
| Wheat     |        8 |      95 Quintals |
| Maize     |        5 |      50 Quintals |
| **Total** |   **25** | **325 Quintals** |

---

## 7. Appointment Management

Procurement centre staff can view appointments for a selected date.

Appointments can be managed using the available status actions, allowing staff to keep the appointment list up to date.

The interface also reflects the current appointment status when actions are performed.

---

# System Flow

```text
                FARMER
                   |
                   v
          Create / Access Profile
                   |
                   v
          Select Procurement Centre
                   |
                   v
              Select Date
                   |
                   v
            View Available Slots
                   |
                   v
        Enter Crop & Quantity
                   |
                   v
          Confirm Appointment
                   |
                   v
             QR Pass Generated
                   |
                   v
          Arrive at the Centre
                   |
                   v
          QR Code Verification
                   |
                   v
              Verified Entry
```

Centre-side flow:

```text
        PROCUREMENT CENTRE
                |
                v
        Configure Schedule
                |
        +-------+-------+
        |               |
        v               v
  Daily Capacity    Time Slots
        |               |
        +-------+-------+
                |
                v
        Receive Appointments
                |
                v
        Manage Appointment
                |
                v
          Scan QR Code
                |
                v
        Verify Appointment
```

---

# Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* Lucide Icons

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* SQLite

### QR Functionality

* QR code generation
* Camera-based QR scanning
* Appointment verification

---

# Project Structure

```text
BHARATAGRI/
│
├── backend/
│   ├── ...
│   └── ...
│
├── frontend/
│   ├── ...
│   └── ...
│
└── README.md
```

The project is divided into separate frontend and backend applications.

---

# Running the Project Locally

## Prerequisites

Make sure the following are installed:

* Node.js
* npm

---

## 1. Start the Backend

Open a terminal:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

The SQLite database is created/initialized by the backend according to the project's database configuration.

---

## 2. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the local development URL shown by Vite in the terminal.

If the project is configured to use port 3000, it will be:

```text
http://localhost:3000
```

---

# Prototype Scope

The current prototype intentionally focuses on:

* Farmer registration
* Procurement centre registration
* Appointment scheduling
* Date-wise slot management
* Daily Quintal capacity
* Time-slot capacity
* Appointment management
* QR appointment generation
* QR-based appointment verification

The prototype does **not** implement the complete agricultural procurement lifecycle.

The following are outside the current prototype scope:

* Actual produce procurement
* Weighing operations
* Quality inspection
* Payment processing
* Storage management
* Truck allocation
* Inventory management
* End-to-end produce tracking

These can be considered for future development.

---

# Future Scope

Possible extensions include:

* Regional language support
* SMS/WhatsApp appointment notifications
* Advanced centre analytics
* Demand and capacity prediction
* Integration with government procurement systems
* Farmer assistance through CSC/Panchayat operators
* Digital weighing and quality records
* Payment tracking
* Transportation coordination
* Multi-centre management
* Historical procurement analytics

---

# Project Highlights

BHARATAGRI focuses on a specific part of the agricultural-centre workflow:

> **Plan the visit → Reserve the capacity → Receive a digital pass → Verify the visit**

Rather than attempting to build the entire procurement lifecycle in one prototype, the system concentrates on making **appointment scheduling and entry management** simple and manageable for both farmers and procurement centres.

---

## Team

### Team Trojan Horse

Built for the **Bit N Build Hackathon**.

---
