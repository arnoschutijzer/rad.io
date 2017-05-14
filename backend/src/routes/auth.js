const jwt = require('jsonwebtoken');
const passport = require('passport');
const authRouter = require('express').Router();
const User = require('../models/user');
const settings = require('../config/settings');

authRouter.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(409).json({success: false, message: 'No credentials'});
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save().then(() => {
      res.json({success: true, message: 'Registered'});
    }).catch(() => {
      res.status(409).json(
        {success: false, message: 'This username is already registered'}
      );
    });
  }
});

authRouter.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(401).json({success: false, message: 'No credentials'});
  }

  User.findOne({
    username: req.body.username
  }).then(user => {
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found' });
    }

    user.comparePassword(req.body.password).then(() => {
      const token = jwt.sign(user, settings.secret, {
        expiresIn: 604800
      });

      res.status(200).json({ success: true, token: 'JWT ' + token, user });
    }).catch(err => {
      res.status(401).json({ success: false, message: err });
    });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err });
  });
});

authRouter.get('/profile', passport.authenticate('jwt', {session: false}),
 (req, res) => {
   User.findOne({
     _id: req.user._id
   }).then(user => {
     res.status(200).json({ success: true, user });
   }).catch(err => {
     res.status(409).json({ success: false, message: err });
   }) ;
 });

module.exports = authRouter;
