const mongoose = require('mongoose');

// প্রতিটি স্টেশনের তথ্য ধারণ করার জন্য সাব-স্কিমা
const stopSchema = new mongoose.Schema({
  stationName: {
    type: String,
    required: true,
    trim: true,
  },
  arrivalTime: {
    type: String,
    default: null,
  },
  departureTime: {
    type: String,
    default: null,
  },
}, { _id: false });

// ট্রেনের সম্পূর্ণ রুট ধারণ করার জন্য মূল স্কিমা
const trainRouteSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true,
  },
  trainName: {
    type: String,
    required: true,
  },
  stops: [stopSchema],
  runDays: {
    type: [String],
    default: [],
  },
});

//<<<<< গুরুত্বপূর্ণ: মডেলটিকে সঠিকভাবে এক্সপোর্ট করা হচ্ছে >>>>>
module.exports = mongoose.model('TrainRoute', trainRouteSchema);