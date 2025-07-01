//import express from 'express';
//import { getUserProfile } from '../controllers/userController.js';
//import { protect } from '../middleware/authMiddleware.js';

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
