import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../backend/config/database.js';
import authRoutes from '../backend/routes/auth.js';
import projectRoutes from '../backend/routes/projects.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB (only once)
let isConnected = false;
const ensureConnection = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running on Vercel' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Vercel serverless function handler
export default async (req, res) => {
  await ensureConnection();
  return app(req, res);
};
