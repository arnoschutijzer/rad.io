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
  submitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const model = mongoose.model('Link', schema);

module.exports = model;