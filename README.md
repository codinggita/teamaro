# 🚀 Vanguard AERO — Squadron Operations Command Center

Vanguard AERO is a high-fidelity, interactive management platform engineered to orchestrate team-based activities within a decentralized squadron environment. It transitions unstructured community communication into a high-density, automated workflow: **Discuss → Vote → Schedule → Play → Track**.

---

## 🎨 Design & API Blueprints
The architecture of AERO is built upon precision and technical excellence. Access our core blueprints below:

*   **📐 Figma Design (High-Fidelity UI/UX)**: [Vanguard AERO Design System](https://www.figma.com/design/J3WIPiDdIrCrlH6Emvh9Wu/Untitled?node-id=200-967&t=IL7XWAPEIOEd8dGf-1)
*   **📡 API Documentation (Postman)**: [Vanguard RESTful API Specification](https://documenter.getpostman.com/view/50840753/2sBXqKoKuJ)

---

## 🎯 Project Vision

### The Problem
In large-scale batch environments (e.g., students divided into squads), coordination via traditional messaging apps leads to **Entropy** (lost decisions), **Opacity** (no performance record), and **Inertia** (manual scheduling errors).

### The AERO Solution
AERO provides a centralized, **Identity-First** portal that serves as the "source of truth" for the squadron. It leverages real-time synchronization, immersive 3D aesthetics, and role-based permissions to ensure every operation is executed with surgical precision.

---

## ✨ Core Feature Ecosystem

### 🛡️ Identity Vault (New)
*   **Visual Avatar Gallery**: A high-fidelity grid selection system allowing users to pick from 16+ character styles.
*   **Custom Image Injection**: Support for local `.jpg`/`.png` uploads for personalized squadron identification.
*   **Global Sync**: Identity changes reflect instantly across the Navbar, Leaderboard, and MemberNet roster.

### 🌐 MemberNet Roster
*   **30-Member High-Density Grid**: A specialized view displaying all authorized squadron personnel.
*   **Dynamic Profiles**: Detailed technical bios for every student, accessible via direct deep-linking (`/profile/:userId`).
*   **Compact Card UI**: Glassmorphic card design optimized for rapid browsing and data accessibility.

### 🗳️ Decision & Performance Hub
*   **Real-time Polls**: Democratic decision-making with live result broadcasting via Socket.io.
*   **Participation Tracker**: Weighted ranking system based on Participation (40%), Performance (40%), and Achievements (20%).
*   **Smart Notifications**: Actionable alerts that redirect users directly to Polls, Events, or Leaderboard updates.

### 🎨 Atmospheric Immersion
*   **AeroSky Engine**: A 3D atmospheric simulation built with Three.js that reacts to navigation state.
*   **Glassmorphic Design System**: Custom-built UI components featuring deep blur, metallic borders, and vibrant HSL color palettes.

---

## 🧠 Technical Architecture

### Tech Stack
| Tier | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 (Vite) | High-performance UI rendering |
| **State** | Redux Toolkit | Centralized state management & persistence |
| **3D Engine** | Three.js / R3F | Immersive "AeroSky" atmospheric background |
| **Real-time** | Socket.IO | Bi-directional event synchronization |
| **Styling** | Vanilla CSS + Tailwind | Utility-first, high-density design system |
| **Animations** | Framer Motion | Cinematic transitions and micro-interactions |
| **Backend** | Node.js (Express) | RESTful API & Signaling server |
| **Database** | MongoDB | Persistent storage for users and operations |

---

## 📂 Granular Folder Architecture

### 🖥️ Client Architecture (`/frontend`)
```bash
src/
├── assets/          # Brand identity, icons, and 3D models
├── components/      # Atomic UI components (Navbar, Sidebar, Toast)
│   ├── AeroUI.jsx   # Core Design System (GlassPanel, AeroButton)
│   └── Layout.jsx   # Navigation & Protected Route wrapper
├── hooks/           # Business logic (useAuth, useToast, useSocket)
├── pages/           # Views (Members, Profile, Dashboard, Polls)
├── redux/           # Global State Management (Store & Slices)
└── utils/           # User Mapping, Constants, and Formatting
```

### ⚙️ Server Architecture (`/backend`)
```bash
src/
├── controllers/     # API logic for Auth, Polls, and Users
├── middleware/      # JWT Security & Error Interceptors
├── models/          # MongoDB Schemas
├── routes/          # API Endpoint mapping
└── index.js         # Entry point & WebSocket server
```

---

## 🚀 Installation & Setup

### 1. Repository Initialization
```bash
git clone https://github.com/Dhvanitkanabar/teamaero.git
cd teamaero
```

### 2. Environment Configuration
**Frontend (`/frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**Backend (`/backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```

### 3. Launch Command
```bash
# In separate terminals:
cd frontend && npm install && npm run dev
cd backend && npm install && npm start
```

---

## 🛠️ Development Standards
*   **Formatting**: Standardized via Prettier for codebase consistency.
*   **Quality**: ESLint integrated for real-time error detection.
*   **Deployment**: Optimized for high-concurrency real-time environments.

---

**👨‍💻 Developed By**: Dhvanit Kanabar & Vanguard Development Team
**📍 Project Scope**: Squadron Coordination & Activity Management Platform