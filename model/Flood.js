const mongoose = require('mongoose');

const FloodSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Flood', FloodSchema);


