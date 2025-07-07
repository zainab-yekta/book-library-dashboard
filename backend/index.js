const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();         // Load environment variables
connectDB();             // Connect to MongoDB

const app = express();  // Create Express app

const allowedOrigins = [
  'https://book-library-dashboard.vercel.app',
  'https://book-library-dashboard-git-main-zeinab-ramezani-yektas-projects.vercel.app'
];

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static('uploads'));

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
