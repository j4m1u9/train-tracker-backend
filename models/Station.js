const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  bn_name: { // বাংলা নাম
    type: String,
    required: true
  },
  code: { // স্টেশনের কোড (যদি থাকে)
    type: String,
    unique: true,
    sparse: true // এই অপশনটি একাধিক ডকুমেন্টে কোড ফিল্ড ফাঁকা রাখতে সাহায্য করে
  }
});

module.exports = mongoose.model('Station', stationSchema);