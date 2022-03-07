const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 255
  }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song
