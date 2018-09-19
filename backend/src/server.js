const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const settings = require('./config/settings');
const auth = require('./config/auth');
const server = express();
const routes = require('./routes');
const httpServer = require('http').createServer(server);
const initializeSocketServer = require('./socket/server.js');
initializeSocketServer(httpServer);

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false }));
server.use(cors({
  // Reflect the request origin
  origin: true,
  // Pass the header
  credentials: true
}));
server.use(routes.auth);
server.use(routes.chat);
server.use(routes.rooms);
server.use(routes.util);

auth(passport);

// Since the default promise library mongoose uses is deprecated,
// we plug in the ES6 Promise instead
mongoose.Promise = global.Promise;

mongoose.connect(settings.DATABASE, { 
  user: 'root',
  pass: 'example'  
}).then(() => {
  console.info('> Successfully connected to database');
}).catch((error) => {
  if (error) {
    console.error(`> Failed connecting to the database on ${settings.DATABASE}`);
    console.error(error);
    process.exit(1);
  }
});

httpServer.listen(settings.PORT, () => {
  console.info('> Started rad.io-backend on port ' + settings.PORT);
});

server.get('/', (req, res) => {
  res.send('Successfully started rad.io-backend');
});
