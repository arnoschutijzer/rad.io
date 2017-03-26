const express = require('express');
const server = express();
const port = '8080';

const utilRoutes = require('./routes/util');

server.use(utilRoutes);

server.get('/', (req, res) => {
  res.send('Successfully started rad.io-backend');
});

server.listen(port, () => {
  console.log("> Started rad.io-backend on port " + port);
});