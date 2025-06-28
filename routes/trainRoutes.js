const express = require('express');
const router = express.Router();

//<<<<< গুরুত্বপূর্ণ: মডেলগুলোকে সঠিকভাবে ইম্পোর্ট করা হচ্ছে >>>>>
const TrainReport = require('../models/Train');
const TrainRoute = require('../models/TrainRoute'); // TrainRoute মডেলটি এখানে ইম্পোর্ট করা হয়েছে

// ... আপনার বাকি কোড (যেমন /report এবং /search/:trainNumber এন্ডপয়েন্ট) অপরিবর্তিত থাকবে ...

router.post('/report', async (req, res) => {
    // ... এই কোড অপরিবর্তিত ...
});

router.get('/search/:trainNumber', async (req, res) => {
    // ... এই কোড অপরিবর্তিত ...
});


/**
 * @route   POST /api/train/find-between-stations
 * @desc    দুটি স্টেশনের মধ্যে সব ট্রেন খুঁজে বের করার জন্য
 */
router.post('/find-between-stations', async (req, res) => {
  try {
    const { fromStation, toStation } = req.body;
    if (!fromStation || !toStation) {
      return res.status(400).json({ message: 'অনুগ্রহ করে দুটি স্টেশনই সিলেক্ট করুন।' });
    }

    //<<<<< এখন TrainRoute.find() সঠিকভাবে কাজ করবে >>>>>
    const routesContainingBothStations = await TrainRoute.find({
      'stops.stationName': { $all: [fromStation, toStation] }
    });

    const validRoutes = routesContainingBothStations.filter(route => {
      const fromIndex = route.stops.findIndex(stop => stop.stationName === fromStation);
      const toIndex = route.stops.findIndex(stop => stop.stationName === toStation);
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    if (validRoutes.length === 0) {
      return res.status(404).json({ message: 'এই রুটে কোনো ট্রেন খুঁজে পাওয়া যায়নি।' });
    }
    
    res.json(validRoutes);

  } catch (err) {
    console.error("Find trains error:", err);
    res.status(500).json({ message: 'সার্ভার এরর: ' + err.message });
  }
});

module.exports = router;