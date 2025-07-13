const request = require('supertest');
const express = require('express');
const bookRoutes = require('../routes/bookRoutes');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

// Test public books route (no auth required)
describe('GET /api/books/public', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/books/public');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000);
});

describe('GET /api/books (protected)', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/not authorized/i);
  });
});
