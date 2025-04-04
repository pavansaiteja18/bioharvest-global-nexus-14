
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe, 
  updateUser, 
  getAllUsers, 
  deleteUser,
  getFarmers,
  getOperators
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateUser);
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, deleteUser);

// Role-specific routes
router.get('/farmers', protect, getFarmers);
router.get('/operators', protect, getOperators);

module.exports = router;
