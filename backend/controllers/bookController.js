const Book = require('../models/Book');

// @desc    Get all public books (global, no login required)
// @route   GET /api/books/public
// @access  Public
const getPublicBooks = async (req, res) => {
  try {
    const publicBooks = await Book.find({ isPublic: true });
    res.json(publicBooks);
  } catch (error) {
    console.error('Error fetching public books:', error);
    res.status(500).json({ message: 'Failed to fetch public books' });
  }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Private
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({
      $or: [
        { isPublic: true },
        { user: req.user?._id }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const pdf = req.file ? req.file.path : null; // 👈 Get uploaded file path

    const book = new Book({
      title,
      author,
      genre,
      year,
      user: req.user._id,
      pdf, // 👈 Save file path to the database
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    console.error('Error in createBook:', error);
    res.status(500).json({ message: 'Server error while creating book' });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (book.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await Book.deleteOne({ _id: book._id });
  res.json({ message: 'Book removed' });
};

const updateBook = async (req, res) => {
  try {
    console.log('Book ID from URL:', req.params.id);
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    console.log('Book:', book);
    console.log('Request body:', req.body);
    console.log('User role:', req.user.role);

    // Allow only the owner or admin to edit
    if (book.user && book.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    // Allow admin to change public/private status
    if (req.user.role === 'admin' && 'isPublic' in req.body) {
      book.isPublic = req.body.isPublic;
    }

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get books created by a specific user
// @route   GET /api/books/user/:userId
// @access  Private
const getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({ user: req.params.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user books' });
  }
};

module.exports = {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
  getPublicBooks,
  getBooksByUser,
};
