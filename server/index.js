
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Log environment variables (without revealing secrets)
console.log('Environment check:');
console.log('- MONGO_URI:', process.env.MONGO_URI ? 'Exists' : 'Missing');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'Exists' : 'Missing');
console.log('- PORT:', process.env.PORT || '8080 (default)');

const app = express();
const PORT = process.env.PORT || 8000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger middleware with more details
app.use((req, res, next) => {
  const start = new Date();
  console.log(`${start.toISOString()} - ${req.method} ${req.originalUrl}`);
  
  // Log request body for POST/PUT requests (omitting sensitive fields)
  if (['POST', 'PUT'].includes(req.method) && req.body) {
    const logBody = { ...req.body };
    // Don't log passwords
    if (logBody.password) logBody.password = '[REDACTED]';
    console.log('Request body:', logBody);
  }
  
  // Log response when finished
  res.on('finish', () => {
    const duration = new Date().getTime() - start.getTime();
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Enhanced health check endpoint
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongo: process.env.MONGO_URI ? 'configured' : 'missing',
    jwt: process.env.JWT_SECRET ? 'configured' : 'missing'
  };
  res.status(200).json(healthData);
});

// Error handler
app.use(errorHandler);

// Start server with improved error handling
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Health check available at http://localhost:${PORT}/api/health`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
