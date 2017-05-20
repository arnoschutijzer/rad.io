const mongoose = require('mongoose');

const schema = mongoose.Schema({
  content: {
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {
      type: String,
      required: true
    }
  },
  room: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Room',
    required: true
  }
});

const model = mongoose.model('Message', schema);

module.exports = model;
