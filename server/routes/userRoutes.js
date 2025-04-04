
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe, 
  updateUser, 
  getAllUsers, 
  deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/me', protect, updateUser);
router.get('/', protect, getAllUsers);
router.delete('/:id', protect, deleteUser);

module.exports = router;
