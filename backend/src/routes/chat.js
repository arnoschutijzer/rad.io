const passport = require('passport');
const messageRouter = require('express').Router();
const Message = require('../models/message');

messageRouter.get('/chatlog/:roomId', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if (!req.params.roomId) {
      res.sendStatus(400);
    }

    Message.find({ room: req.params.roomId }).populate('content.author').exec().then(messages => {
      res.json(messages);
    }).catch(err => {
      res.status(500).json(err);
    });
  });

module.exports = messageRouter;