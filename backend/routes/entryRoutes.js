const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entryController');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT auth middleware

// Create new diary entry
router.post('/', authMiddleware, entryController.addEntry);

// Get all diary entries for logged-in user
router.get('/', authMiddleware, entryController.getEntries);

// Get a single diary entry by ID
router.get('/:id', authMiddleware, entryController.getEntryById);

// Update diary entry by ID
router.put('/:id', authMiddleware, entryController.updateEntry);

// Delete diary entry by ID
router.delete('/:id', authMiddleware, entryController.deleteEntry);

module.exports = router;
