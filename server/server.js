import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import feedbackRoutes from './routes/feedback.js';
import adminRoutes from './routes/admin.js';
import initializeDatabase from './config/db.js';


const app = express();

// Single frontend link allowed by CORS
const clientUrl = process.env.CLIENT_URL;

//cors config 
app.use(cors({
  origin: clientUrl,
  credentials: true,
}));

//json middleware
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'MongoDB connected' : 'Local JSON Store active',
  });
});

// API Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);


// Initialize database connection
initializeDatabase();

// Start server
const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`running on http://localhost:${port}`);
});
