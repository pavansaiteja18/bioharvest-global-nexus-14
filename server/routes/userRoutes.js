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

export default router;
