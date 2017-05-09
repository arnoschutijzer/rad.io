const mongoose = require('mongoose');

const schema = mongoose.Schema({
  content: {
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {
      type: String,
      required: true
    }
  }
});

const model = mongoose.model('Message', schema);

module.exports = model;
