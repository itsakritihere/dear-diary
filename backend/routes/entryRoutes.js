const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const authenticateToken = require('../middlewares/authMiddleware'); // JWT Middleware

// Create new diary entry
router.post('/', authenticateToken, entryController.addEntry);

// Get all diary entries for logged-in user
router.get('/', authenticateToken, entryController.getEntries);

// Get a single diary entry by ID
router.get('/:id', authenticateToken, entryController.getEntryById);

// Update diary entry by ID
router.put('/:id', authenticateToken, entryController.updateEntry);

// Delete diary entry by ID
router.delete('/:id', authenticateToken, entryController.deleteEntry);

module.exports = router;
