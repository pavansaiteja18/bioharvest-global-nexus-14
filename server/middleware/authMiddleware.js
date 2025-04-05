
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Log token for debugging
      console.log('Processing token:', token ? `${token.substring(0, 10)}...` : 'none');
      
      if (!token) {
        console.log('Token is empty even though Authorization header exists');
        res.status(401);
        throw new Error('Not authorized, token is empty');
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, decoded ID:', decoded.id);
      
      // Find user by ID
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.log('User not found for ID:', decoded.id);
        res.status(401);
        throw new Error('User not found');
      }

      console.log('User authenticated:', req.user.name, 'Role:', req.user.role);
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      res.status(401);
      throw new Error('Not authorized: ' + error.message);
    }
  } else {
    if (!token) {
      console.log('No authorization header found');
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
});

const admin = asyncHandler((req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('Admin access granted for user:', req.user.name);
    next();
  } else {
    console.log('Admin access denied for user:', req.user ? req.user.name : 'unknown', 'Role:', req.user ? req.user.role : 'none');
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
});

export { protect, admin };
