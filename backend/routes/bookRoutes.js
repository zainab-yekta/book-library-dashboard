const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const {
  getBooks,
  deleteBook,
  updateBook,
  getPublicBooks,
  getBooksByUser,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const Book = require('../models/Book'); // ✅ Needed if using inline book creation

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
router.post('/', protect, upload.single('pdf'), async (req, res) => {
  try {
    const { title, author } = req.body;
    const pdfPath = req.file ? req.file.path : null;

    const newBook = new Book({
      title,
      author,
      user: req.user.id,
      pdf: pdfPath,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Failed to add book:', err);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

// ✅ Update and delete by ID
router
  .route('/:id')
  .delete(protect, deleteBook)
  .put(protect, updateBook);

module.exports = router;
