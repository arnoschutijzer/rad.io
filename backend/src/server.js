const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const settings = require('./config/settings');
const auth = require('./config/auth');
const server = express();
const routes = require('./routes');
const createServer = require('./socket/server.js');
const httpServer = require('http').createServer(server);
createServer(httpServer);

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: false}));
server.use(cors({
  // Reflect the request origin
  origin: true,
  // Pass the header
  credentials: true
}));
server.use(routes.util);
server.use(routes.auth);
server.use(routes.docs);

auth(passport);

mongoose.connect(settings.database, () => {

});

mongoose.connection.once('open', () => {
  console.info('> Sucessfully connected to database');
});

server.listen(settings.port, () => {
  console.info('> Started rad.io-backend on port ' + settings.port);
});

server.get('/', (req, res) => {
  res.send('Successfully started rad.io-backend');
});
