const passport = require('passport');
const roomsRouter = require('express').Router();
const Room = require('../models/room');
const getRandomGradient = require('../helpers/randomGradient');

roomsRouter.post('/room', passport.authenticate('jwt', { session: false }), (req, res) => {
  const room = new Room({
    name: req.body.name,
    topic: req.body.topic,
    creator: req.user._id,
    style: getRandomGradient()
  });

  room.save().then(() => {
    res.status(200).json(room);
  }).catch((err) => {
    res.status(500).json({ err });
  });
});

roomsRouter.get('/rooms', (req, res) => {
  Room.find().populate('creator').exec().then((rooms) => {
    res.json(rooms);
  });
});

module.exports = roomsRouter;