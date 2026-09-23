const express = require('express');
const router = express.Router();
const { getAdminStats, getAllBooksForAdmin } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getAdminStats);
router.get('/books', protect, adminOnly, getAllBooksForAdmin);


module.exports = router;
