# Sayan Adhikary - Full-Stack Portfolio

A personal developer portfolio built with React, Tailwind CSS, Node.js, Express, and MongoDB. It includes a custom Daylight and Night theme toggle, interactive project case studies, and a visitor feedback wall with a password-protected admin dashboard.

---

## Features

### 1. Theme Switch (Daylight & Night Mode)
- Custom light (Daylight) and dark (Night) modes implemented with Tailwind CSS and CSS variables.
- Smooth transition states across all components with theme persistence in `localStorage`.

### 2. Visitor Feedback Wall
- **Visitor Form**: Visitors can leave a name (or post anonymously), star rating (1 to 5), and feedback message.
- **Public Wall**: Displays approved feedback fetched from `GET /api/feedback`. Pending and rejected entries stay hidden.
- **Visitor Reactions**: Simple helpful/like counter for each published feedback card.

### 3. Protected Admin Moderation
- Password-protected modal (default: `admin123`).
- Filter feedback by status: `Pending`, `Published`, `Rejected`, and `All`.
- Actions: approve/publish, reject/hide, or delete permanently.

### 4. Portfolio AI Assistant
- Floating chat widget answering questions about projects, technical skills, education, and contact links.

---

## Project Structure

```text
├── client/                     # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # UI sections (Navbar, Hero, About, Projects, etc.)
│   │   ├── context/            # ThemeContext (Daylight / Night)
│   │   ├── data/               # portfolioData.js (projects, skills, education)
│   │   ├── App.jsx             # Main layout
│   │   └── main.jsx
│   ├── vite.config.js          # Vite config with /api proxy
│   └── package.json
│
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── models/                 # Mongoose models (Feedback.js)
│   ├── routes/                 # Express route handlers (feedback.js, admin.js)
│   ├── middleware/             # Admin auth middleware
│   ├── data/                   # Data storage layer (MongoDB with JSON fallback)
│   ├── server.js               # Express server entry point
│   └── package.json
│
├── GEMINI.md                   # Workspace rules & style guidelines
├── package.json                # Root scripts (runs client + server concurrently)
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local instance or MongoDB Atlas URI, optional; defaults to a local JSON fallback if omitted)

### Installation

1. Install root, client, and server dependencies:
   ```bash
   npm install
   npm run dev --prefix client -- --force # or cd client && npm install
   cd server && npm install && cd ..
   ```

2. Configure environment variables in `server/.env`:
   ```env
   PORT=5000
   ADMIN_PASSWORD=admin123
   NODE_ENV=development
   # MON остаётся optional:
   # MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

3. Run both client and server in development:
   ```bash
   npm run dev
   ```

   The client runs on `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/feedback` | Retrieve published feedback | No |
| `POST` | `/api/feedback` | Submit new feedback (saved as `pending`) | No |
| `POST` | `/api/feedback/:id/react` | Increment helpful reaction count | No |
| `POST` | `/api/admin/login` | Verify admin password | No |
| `GET` | `/api/admin/feedback` | Retrieve all feedback (pending, approved, rejected) | Yes (`Authorization: Bearer <token>`) |
| `PATCH` | `/api/admin/feedback/:id` | Update status (`published` / `rejected`) | Yes (`Authorization: Bearer <token>`) |
| `DELETE` | `/api/admin/feedback/:id` | Permanently delete feedback | Yes (`Authorization: Bearer <token>`) |

---

## Deployment

### 1. Backend (e.g., Render, Railway, Heroku)
- Root directory: `server`
- Build command: `npm install`
- Start command: `node server.js`
- Environment variables:
  ```env
  PORT=5000
  CLIENT_URL=https://your-frontend.vercel.app
  MONGODB_URI=your_mongodb_atlas_connection_string
  ADMIN_PASSWORD=your_secure_password
  ```

### 2. Frontend (e.g., Vercel, Netlify, Cloudflare Pages)
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  ```env
  VITE_API_URL=https://your-backend-api.onrender.com
  ```
  Note: When `VITE_API_URL` is set, all frontend requests automatically target your live backend API. When running locally with `npm run dev`, leaving it blank routes requests through Vite's local dev proxy (`http://localhost:5000`).

---

## Author

- **Sayan Adhikary**
- GitHub: [@papu9679](https://github.com/papu9679)
- Email: sayanadhikary.dev@gmail.com
- LinkedIn: [sayanadhikary](https://linkedin.com/in/papu9679)
