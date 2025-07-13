const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('POST /api/users/login', () => {
  it('should return 401 for invalid credentials', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'fakeuser@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });
});
