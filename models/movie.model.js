const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  celebrity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrity',
  },
  plot: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', schema);

