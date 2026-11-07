import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import feedbackRoutes from './routes/feedback.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'MongoDB connected' : 'Local JSON Store active',
  });
});

// API Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB with graceful fallback
async function initializeDatabase() {
  if (process.env.SKIP_MONGO === 'true') {
    console.log('ℹ️  Skipping MongoDB connection. Operating in standalone JSON storage mode.');
    return;
  }

  try {
    console.log(`⏳ Attempting to connect to MongoDB at: ${MONGODB_URI.replace(/\/\/.*@/, '//***@')}`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('✅ Connected successfully to MongoDB!');
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed or not active.');
    console.warn(`   Reason: ${err.message}`);
    console.log('✨ Gracefully running with auto-persisting JSON file storage (zero setup needed).');
  }
}

// Serve client build if available (Production deployment support)
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

// Catch-all fallback for client SPA in production
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  const indexPath = path.join(clientDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('API is running. Build client with "npm run build" to view web UI here.');
    }
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Sayan Adhikary Portfolio API running on http://localhost:${PORT}`);
  console.log(`🔒 Default Admin Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
  await initializeDatabase();
});
