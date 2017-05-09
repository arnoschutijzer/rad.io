const passport = require('passport');
const messageRouter = require('express').Router();
const Message = require('../models/message');

messageRouter.get('/chatlog', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Message.find().populate('content.author').exec((err, messages) => {
      console.log(messages);
      res.json(messages);
    });
  });

module.exports = messageRouter;