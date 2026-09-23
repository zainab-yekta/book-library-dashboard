const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
  getPublicBooks,
  getBooksByUser,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// 🔧 Setup multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Public route for global books (no login needed)
router.get('/public', getPublicBooks);

// ✅ Route to get books by user
router.get('/user/:userId', protect, getBooksByUser);

// ✅ Get all books
router.get('/', protect, getBooks);

// ✅ Create a new book (with optional PDF upload)
router.post('/', protect, upload.single('pdf'), createBook);

// ✅ Update and delete by ID
router
  .route('/:id')
  .delete(protect, deleteBook)
  .put(protect, updateBook);

module.exports = router;
