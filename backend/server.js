require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/super-admin', require('./routes/superAdminRoutes'));
app.use('/api/principal', require('./routes/principalRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Platform API is active' });
});

// Fallback error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node Core Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
