const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  style: {
    top: {
      type: String
    },
    bottom: {
      type: String
    }
  },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const model = mongoose.model('Room', schema);

module.exports = model;
