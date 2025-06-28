const TrainLocation = require('../models/TrainLocation');

// POST: লোকেশন আপডেট করার জন্য
const updateLocation = async (req, res) => {
  const { trainNo, lat, lng } = req.body;
  try {
    const newLoc = new TrainLocation({ trainNo, lat, lng });
    await newLoc.save();
    res.status(201).json({ message: "✅ Location saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: সর্বশেষ ট্রেন লোকেশন দেখানোর জন্য
const getLiveLocation = async (req, res) => {
  const { trainNo } = req.params;
  try {
    const latest = await TrainLocation.find({ trainNo }).sort({ timestamp: -1 }).limit(1);
    if (!latest.length) return res.status(404).json({ message: "No location data found." });
    res.json(latest[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { updateLocation, getLiveLocation };
