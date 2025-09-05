const { body, validationResult } = require('express-validator');
const DiaryEntry = require('../models/DiaryEntry');

// Validation middleware for entry input
exports.validateEntry = [
  body('date').notEmpty().withMessage('Date is required'),
  body('content').notEmpty().withMessage('Content is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

// Add new diary entry
exports.addEntry = async (req, res) => {
  try {
    const { date, mood, content } = req.body;
    const userId = req.user.userId;

    const entry = new DiaryEntry({ user: userId, date, mood, content });
    const savedEntry = await entry.save();

    res.status(201).json({ success: true, data: savedEntry, message: 'Entry saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all diary entries for logged-in user
exports.getEntries = async (req, res) => {
  try {
    const userId = req.user.userId;
    const entries = await DiaryEntry.find({ user: userId }).sort({ date: -1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get one diary entry by ID
exports.getEntryById = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Entry not found' });
    }
    res.json({ success: true, data: entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update diary entry by ID
exports.updateEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Entry not found or not authorized' });
    }

    // Update fields if provided
    entry.content = req.body.content || entry.content;
    entry.mood = req.body.mood || entry.mood;
    entry.date = req.body.date || entry.date;

    const updatedEntry = await entry.save();
    res.json({ success: true, data: updatedEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete diary entry by ID
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Entry not found or not authorized' });
    }

    await entry.deleteOne();
    res.json({ success: true, message: 'Entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
