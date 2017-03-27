const modelRouter = require('express').Router();

const userModel = require('../models/user').schema.obj;
const linkModel = require('../models/link').schema.obj;

modelRouter.get('/models', (req, res) => {
  res.send(
    {
      'user': userModel,
      'link': linkModel
    }
  );
});

module.exports = modelRouter;