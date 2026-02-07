import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    // Create new user
    const user = new User({ name, mobile, password });
    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;

    console.log('Login attempt for mobile:', mobile);

    // Find user
    const user = await User.findOne({ mobile });
    if (!user) {
      console.log('User not found for mobile:', mobile);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user.name);

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', mobile);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for:', mobile);

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        mobile: req.user.mobile,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Debug route - check database status
router.get('/debug/users', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const users = await User.find({}, 'name mobile role').limit(5);
    res.json({
      totalUsers: userCount,
      sampleUsers: users.map(u => ({ name: u.name, mobile: u.mobile, role: u.role }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

export default router;
