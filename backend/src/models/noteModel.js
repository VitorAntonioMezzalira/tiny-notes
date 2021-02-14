const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user_id: { type: String, require: true },
  content: { type: String, require: true }
});

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;