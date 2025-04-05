
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log('Register user request received:', { name, email, role });
  console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

  if (!name || !email || !password) {
    console.log('Missing required fields');
    res.status(400);
    throw new Error('Please add all required fields');
  }

  if (!role || !['farmer', 'operator', 'admin'].includes(role)) {
    console.log('Invalid role:', role);
    res.status(400);
    throw new Error('Please specify a valid role (farmer, operator, or admin)');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log('User already exists with email:', email);
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      console.log('User created successfully:', {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      const token = generateToken(user._id);
      console.log('Generated token:', token ? `${token.substring(0, 10)}...` : 'none');

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      console.log('Failed to create user with data:', { name, email, role });
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500);
    throw new Error(`Server error: ${error.message}`);
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt for email:', email);

  const user = await User.findOne({ email });

  if (!user) {
    console.log('User not found with email:', email);
    res.status(401);
    throw new Error('User not found with this email');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    console.log('User logged in successfully:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    
    const token = generateToken(user._id);
    console.log('Generated token:', token ? `${token.substring(0, 10)}...` : 'none');

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } else {
    console.log('Invalid credentials for email:', email);
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin or Self
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.id.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized');
  }

  await user.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'User removed' });
});

// @desc    Get farmers only
// @route   GET /api/users/farmers
// @access  Private
const getFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({ role: 'farmer' }).select('-password');
  res.status(200).json(farmers);
});

// @desc    Get operators only
// @route   GET /api/users/operators
// @access  Private
const getOperators = asyncHandler(async (req, res) => {
  const operators = await User.find({ role: 'operator' }).select('-password');
  res.status(200).json(operators);
});

export {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getAllUsers,
  deleteUser,
  getFarmers,
  getOperators,
};
