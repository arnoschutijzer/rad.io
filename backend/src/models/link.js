const mongoose = require('mongoose');

const schema = mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  submitter: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Room',
    required: true
  },
  isActive: {
    type: mongoose.Schema.Types.Boolean,
    required: true
  },
  metadata: {
    duration: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    uploader: {
      type: String,
      required: true
    }
  }
});

const model = mongoose.model('Link', schema);

module.exports = model;
