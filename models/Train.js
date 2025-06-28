const mongoose = require('mongoose');

// Mongoose Schema ব্যবহার করে ডেটার গঠন নির্ধারণ করা হচ্ছে
const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: [true, 'ট্রেনের নম্বর আবশ্যক'], // এই ফিল্ডটি থাকা বাধ্যতামূলক
    trim: true // নামের আগে বা পরে থাকা অপ্রয়োজনীয় স্পেস মুছে ফেলবে
  },
  currentStation: {
    type: String,
    required: [true, 'বর্তমান স্টেশনের নাম আবশ্যক'],
    trim: true
  },
  reportedBy: {
    type: String,
    default: 'Anonymous' // যদি কেউ নাম না দেয়, তাহলে 'Anonymous' হিসেবে সেভ হবে
  },
  timestamp: {
    type: Date,
    default: Date.now // ডেটা সেভ হওয়ার সময় অটোমেটিক্যালি টাইমস্ট্যাম্প যোগ হবে
  },
  location: {
    // এই অংশটি জিও-লোকেশন (GPS) ডেটা সেভ করার জন্য
    type: {
      type: String,
      enum: ['Point'], // শুধুমাত্র 'Point' টাইপ লোকেশন সাপোর্ট করবে
      default: 'Point'
    },
    coordinates: {
      type: [Number], // অ্যারে-এর মধ্যে নম্বর থাকবে [longitude, latitude]
      index: '2dsphere', // ম্যাপে লোকেশন খোঁজার জন্য এটি খুব জরুরি
      required: [true, 'লোকেশন (longitude, latitude) আবশ্যক']
    }
  }
});

// এই স্কিমা থেকে একটি মডেল তৈরি করা হচ্ছে
const Train = mongoose.model('Train', trainSchema);

// মডেলটিকে অন্য ফাইল থেকে ব্যবহার করার জন্য এক্সপোর্ট করা হচ্ছে
module.exports = Train;
