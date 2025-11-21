const express = require("express");
const Event = require("../models/Event"); // adjust path if needed
const { getEventById } = require("../controllers/eventController");

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // sorted by date ascending
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get('/:id', getEventById);

module.exports = router;
