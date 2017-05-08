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

    user.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(409).json(
          {success: false, message: 'This username is already registered'}
        );
      }

      return res.json({success: true, message: 'Registered'});
    });
  }
});

authRouter.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(401).json({success: false, message: 'No credentials'});
  }

  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (!user) {
      return res.status(404).json({success: false, message: 'No user found'});
    }
    if (err) {
      return res.status(500).json({success: false, message: err});
    }

    user.comparePassword(req.body.password, (err, valid) => {
      if (err) {
        return res.status(401).json({success: false, message: err});
      }

      if (valid) {
        const token = jwt.sign(user, settings.secret, {
          expiresIn: 604800
        });

        return res.status(200)
          .json({success: true, token: 'JWT ' + token, user});
      }
    });
  });
});

authRouter.get('/profile', passport.authenticate('jwt', {session: false}),
 (req, res) => {
   User.findOne({
     _id: req.user._id
   }, (err, user) => {

     if (err) {
       res.status(409).json({success: false, message: err});
     }
     res.status(200).json({success: true, user});
   });
 });

module.exports = authRouter;
