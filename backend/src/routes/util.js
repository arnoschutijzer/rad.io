const express = require('express');
const utilRouter = express.Router();
const pkg = require('../../package.json');

utilRouter.get('/info', (req, res) => {
  res.send(pkg);
});

module.exports = utilRouter;