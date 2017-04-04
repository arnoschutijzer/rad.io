const docsRouter = require('express').Router();
const path = require('path');

docsRouter.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

module.exports = docsRouter;
