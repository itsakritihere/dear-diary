const DiaryEntry = require('../models/DiaryEntry');

const addEntry = async (req, res) => {
  try {
    const { date, mood, content } = req.body;
    const userId = req.user.userId;

    const entry = new DiaryEntry({ user: userId, date, mood, content });
    await entry.save();

    res.status(201).json({ message: 'Entry saved', entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getEntries = async (req, res) => {
  try {
    const userId = req.user.userId;

    const entries = await DiaryEntry.find({ user: userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getEntryById = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Update fields if provided
    entry.content = req.body.content || entry.content;
    entry.mood = req.body.mood || entry.mood;
    entry.date = req.body.date || entry.date;

    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await entry.deleteOne();
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
};
