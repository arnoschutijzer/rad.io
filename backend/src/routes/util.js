const express = require('express');
const utilRouter = express.Router();
const pkg = require('../../package.json');

const userModel = require('../models/user').schema.obj;
const linkModel = require('../models/link').schema.obj;

utilRouter.get('/info', (req, res) => {
  res.send(pkg);
});

utilRouter.get('/models', (req, res) => {
  res.send(
    {
      'user': userModel,
      'link': linkModel
    }
  );
});

utilRouter.get('/status', (req, res) => {
  res.status(204).send();
});

module.exports = utilRouter;