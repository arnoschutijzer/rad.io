const jwt = require('jsonwebtoken');
const passport = require('passport');
const authRouter = require('express').Router();
const User = require('../models/user');
const settings = require('../config/settings');

authRouter.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(409).json({success: false, message: 'ENOCRED'});
  } else {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    user.save((err, user) => {
      if (err) {
        return res.status(409).json(
          {success: false, message: 'This e-mail is already registered!'}
        );
      }

      res.json({success: true, message: 'Registered!'});
    });
  }
});

authRouter.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {

    if (err) {
      throw err;
    }

    if (!user) {
      res.status(404).json({success: false, message: 'No user found.'});
    } else {
      user.comparePassword(req.body.password, (err, valid) => {
        if (err) {
          res.status(401).json({success: false, message: err});
        }

        if (valid) {
          const token = jwt.sign(user, settings.secret, {
            expiresIn: 604800
          });

          res.status(200)
            .json({success: true, token: 'JWT ' + token, user});
        }
      });
    }
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
