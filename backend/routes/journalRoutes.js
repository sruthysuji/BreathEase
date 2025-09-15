const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addJournalEntry,
  getJournalEntries
} = require('../controllers/journalController');

router.post('/', auth, addJournalEntry);
router.get('/', auth, getJournalEntries);


module.exports = router;
