// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');
const books = require('./data/booksData'); 

dotenv.config();

const seedBooks = async () => {
  try {
    await connectDB();
   // await Book.deleteMany(); // clears old data

    const booksWithPublicFlag = books.map((book) => ({
      ...book,
      user: null,         // Global books are not tied to any user
      isPublic: true,     // Globally visible
    }));

    await Book.insertMany(booksWithPublicFlag);
    console.log('Books seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();
