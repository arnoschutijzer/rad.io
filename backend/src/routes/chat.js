const passport = require('passport');
const messageRouter = require('express').Router();
const Message = require('../models/message');

messageRouter.get('/chatlog', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Message.find().populate('content.author').exec().then(messages => {
      res.json(messages);
    }).catch(err => {
      res.status(500).json(err);
    });
  });

module.exports = messageRouter;