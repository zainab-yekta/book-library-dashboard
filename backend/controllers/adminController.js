const Book = require('../models/Book');
const User = require('../models/User');

const getAdminStats = async (req, res) => {
  try {
    const allBooks = await Book.find().populate('user', 'name role');
    // Public books (visible to all users)
    const publicBooks = allBooks.filter(book => book.isPublic);

    // Books added by users (excluding global books, i.e., those with user !== null)
    const userBooks = allBooks.filter(book => book.user?.role === 'user');

    // Total books = userBooks + globalBooks (admin books where user === null)
    const globalBooks = allBooks.filter(book => book.user?.role === 'admin');
    const totalBooks = allBooks.length;

    // Total users excluding admins
    const totalUsers = await User.countDocuments({ role: 'user' });

    res.json({
      totalBooks,
      publicBooks: publicBooks.length,
      userBooks: userBooks.length,
      globalBooks: globalBooks.length,
      totalUsers
    });
  } catch (err) {
    console.error('Error getting admin stats:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};

const getAllBooksForAdmin = async (req, res) => {
  try {
    const books = await Book.find().populate('user', 'name role'); // Optional user name
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

module.exports = { getAdminStats, getAllBooksForAdmin };