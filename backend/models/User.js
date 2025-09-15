const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  affirmation: { type: String, required: true },
  journal: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  journalEntries: [journalEntrySchema] 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
