const User = require('../models/User');

exports.addJournalEntry = async (req, res) => {
  try {
    const { affirmation, journal } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newEntry = { affirmation, journal, createdAt: new Date(), updatedAt: new Date() };
    user.journalEntries.unshift(newEntry);
    await user.save();

    res.status(201).json(user.journalEntries[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJournalEntries = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let entries = user.journalEntries
      .sort((a, b) => b.createdAt - a.createdAt); 

    const limit = parseInt(req.query.limit);
    if (limit && limit > 0) {
      entries = entries.slice(0, limit);
    }

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
