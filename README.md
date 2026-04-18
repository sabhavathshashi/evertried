# EverTried AI Matching Engine 🛠️

EverTried is a state-of-the-art platform designed to revolutionize the way skilled tradespeople (plumbers, electricians, etc.) connect with local employers. By eliminating middlemen and leveraging intelligent matching algorithms, EverTried ensures that the right skills are deployed at the right time and place.

---

## 🏗️ Architecture Overview

The system is built on a modern **MERN-like stack** (MongoDB, Express, React, Node.js) with real-time capabilities and AI integrations.

### 🌐 Frontend (React + Vite)
- **Framework**: React 19 with Vite for fast development and optimized builds.
- **Styling**: Tailwind CSS 4.0 for a modern, responsive, and performance-first UI.
- **Authentication**: Integrated with **Firebase Auth** for secure login and onboarding.
- **Real-time**: `socket.io-client` for instant notifications and live status updates.
- **Contract Management**: Utilizes `jspdf`, `html2canvas`, and `html2pdf.js` for on-the-fly digital contract generation and signing.
- **Icons**: `lucide-react` for a consistent and clean visual language.

### ⚙️ Backend (Node.js + Express)
- **Server**: Express.js handling RESTful APIs and Socket.io events.
- **Database**: MongoDB with Mongoose for robust data modeling and schema validation.
- **Real-time Engine**: Socket.io manages the "Active Match" lifecycle, registrations, and bidirectional communication between users.
- **AI Integration**: Integrated with **Google Gemini** for intelligent processing (routing, skills analysis, etc.).
- **Email Services**: `nodemailer` for transactional emails and OTP verification.
- **Security**: JWT-based authorization and Bcrypt for sensitive data protection.

---

## 🚀 Key Features

### 1. Unified Job Ecosystem
- **Workers**: Can view local jobs, apply instantly, and manage their professional profile.
- **Employers**: Can post jobs, hire workers in slots, and track job fulfillment in real-time.
- **Coordinators**: High-level dashboard for managing users and platform activity.

### 2. Intelligent Matching
- **Proximity Algorithm**: Matches workers based on their current location and job site distance.
- **Skill Fit**: Gemini-powered engine to ensure workers meet the specific technical requirements of a job.

### 3. Digital Contract Workflow
- Automated contract generation upon hiring.
- Dual-party digital signatures.
- Secure storage and downloadable PDF versions of agreements.

### 4. Real-time Status Tracking
- Live updates on job applications (`applied` → `hired` → `contract-signed`).
- Slot-based hiring system (e.g., "Job requires 5 workers, 3/5 slots filled").

---

## 📂 Project Structure

```text
evertried/
├── backend/                # Express server & API logic
│   ├── config/             # DB & configuration files
│   ├── controllers/        # Business logic for routes
│   ├── models/             # Mongoose schemas (Job, User, Contract, etc.)
│   ├── routes/             # API endpoints (Auth, Jobs, Gemini, etc.)
│   └── server.js           # Entry point & Socket.io configuration
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth & Global state providers
│   │   ├── pages/          # Dashboard & Public pages
│   │   └── App.jsx         # Routing & Protected Route logic
│   └── vite.config.js      # Vite configuration
└── README.md               # You are here
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Firebase Project (for Auth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd evertried
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY, FIREBASE_CONFIG, etc.
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   # Create a .env file with:
   # VITE_FIREBASE_..., VITE_API_URL
   npm run dev
   ```

---

## ⚖️ License
License-aware development. All rights reserved by the EverTried team.
