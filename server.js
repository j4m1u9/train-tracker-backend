const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const trainRoutes = require('./routes/trainRoutes');

dotenv.config();

const app = express();
app.use(express.json());
// Health Check Route for Render
app.get('/', (req, res) => {
  res.status(200).send('Server is live and running!');
});
// Routes
app.use('/api/train', trainRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
 
