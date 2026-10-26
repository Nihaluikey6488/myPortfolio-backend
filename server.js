const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Production mein yahan apne frontend domain/URL ka origin dein
  methods: ['POST'],
}));

// Routes Setup
app.use('/api', contactRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running...');
});

// Database Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });