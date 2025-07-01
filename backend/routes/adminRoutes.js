const express = require('express');
const router = express.Router();
const { getAdminStats, getAllBooksForAdmin } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Only logged in users can access stats, but we’ll restrict to admin in frontend
router.get('/stats', protect, getAdminStats);
router.get('/books', protect, adminOnly, getAllBooksForAdmin);


module.exports = router;
