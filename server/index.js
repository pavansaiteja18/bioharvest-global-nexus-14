
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
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

// Start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
