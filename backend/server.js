import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { checkMaintenanceMode } from './middleware/maintenanceMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import principalRoutes from './routes/principalRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://hilarious-frangollo-bb4d6d.netlify.app/',
  credentials: true
}));

// Apply Maintenance Mode Middleware
app.use(checkMaintenanceMode);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/principal', principalRoutes);
app.use('/api/student', studentRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Platform API is active' });
});

// Fallback error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Node Core Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
