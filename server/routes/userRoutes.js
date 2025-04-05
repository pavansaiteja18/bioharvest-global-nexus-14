
import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getAllUsers,
  deleteUser,
  getFarmers,
  getOperators
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateUser);
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, deleteUser);

// Role-specific routes
router.get('/farmers', protect, getFarmers);
router.get('/operators', protect, getOperators);

// Log all available routes for debugging
console.log('User routes registered:');
console.log('- POST /api/users/signup');
console.log('- POST /api/users/login');
console.log('- GET /api/users/me (protected)');
console.log('- PUT /api/users/me (protected)');
console.log('- GET /api/users (protected, admin)');
console.log('- DELETE /api/users/:id (protected)');
console.log('- GET /api/users/farmers (protected)');
console.log('- GET /api/users/operators (protected)');

export default router;
