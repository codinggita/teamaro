# 🚀 AERO – Vanguard Game Platform

AERO is a premium, high-fidelity platform designed to manage team-based activities within the Vanguard community. It transforms unstructured communication into a streamlined workflow: **Discuss → Vote → Schedule → Play → Track**.

---

## ✨ Key Features

### 🔐 Advanced Authentication
- Role-based access (Admin/Member).
- Secure "Remember Me" functionality (per-user basis).
- Automatic logout cleanup for all session/local data.

### 💬 Real-Time Ecosystem
- **Collective Chat**: High-density workspace for squadron discussions.
- **Live Notifications**: Real-time alerts for polls, events, and rankings.
- **Socket Health**: Real-time monitoring of connection status.

### 🗳️ Strategic Operations
- **Poll System**: Democratic decision-making for weekly games.
- **Calendar & Scheduling**: Automated weekly game slots (Wednesdays) with manual override.
- **Leaderboard & MVP**: Dynamic performance tracking and "Wall of Fame" highlights.

### 🛠️ Technical Excellence
- **Storage Utilities**: Centralized, fallback-aware wrappers for `localStorage` and `sessionStorage`.
- **Code Quality**: Strict ESLint configuration and Prettier formatting project-wide.
- **AeroSky Engine**: Immersive 3D atmospheric background system.

---

## 📂 Project Structure

### 💻 Frontend (`/frontend`)
- `src/components/` — Reusable UI components (AeroUI, Layout, SEO).
- `src/hooks/` — Custom hooks (`useAuth`, `useSocketStatus`, `useStorage`).
- `src/pages/` — Core views (Dashboard, Chat, Polls, Admin Control).
- `src/redux/` — State management (Slices for auth, polls, events).
- `src/services/` — API clients and Socket.IO configuration.
- `src/utils/` — Storage utilities, constants, and mock database.

### ⚙️ Backend (`/backend`)
- `src/controllers/` — Request handling logic.
- `src/models/` — MongoDB schemas for Users, Polls, and Games.
- `src/routes/` — API endpoint definitions.
- `src/middleware/` — Auth validation and error handling.
- `src/config/` — Database and environment configuration.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhvanitkanabar/teamaero.git
   cd teamaero
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   npm install
   # Create a .env file based on .env.example
   npm start
   ```

---

## 🛠️ Development Tools

### API Documentation
This project includes a **Postman Collection** for testing and documenting API endpoints.
- **File**: `Vanguard_AERO_API.postman_collection.json`
- **How to use**: 
  1. Open [Postman](https://www.postman.com/).
  2. Click **Import** and select the `.json` file from the project root.
  3. Configure the `baseUrl` variable (default is `http://localhost:5000/api`).

### Code Quality
Maintain standards using the following commands in the `frontend` directory:
- **Linting**: `npm run lint` (Check for errors) or `npm run lint:fix` (Auto-fix).
- **Formatting**: `npm run format` (Format all files using Prettier).

### Tech Stack
- **Frontend**: React, Vite, Redux Toolkit, Framer Motion, Tailwind CSS, Three.js.
- **Backend**: Node.js, Express, MongoDB, Socket.IO.

---

## 🎯 Final Vision
AERO aims to provide a structured, interactive, and visually immersive command center for the Vanguard community, ensuring that every operation—from voting on a game to tracking an MVP—is handled with precision and style.

**👨‍💻 Developed By**: Vanguard Development Team