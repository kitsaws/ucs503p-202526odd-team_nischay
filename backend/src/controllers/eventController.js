const Event = require('../models/Event');

// Get all events (by organizer)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.organizer });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      university: req.user.university,
      created_by: req.user.email,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate({path: 'teams', populate: {path: 'members'}});
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};