const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const settings = require('./config/settings');
const auth = require('./config/auth');
const server = express();

const routes = require('./routes');

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false }));
server.use(cors());
server.use(routes.util);
server.use(routes.auth);
server.use(routes.docs);

auth(passport);

mongoose.connect(settings.database, (err) => {
  //if (err) { console.err(err); }
});

mongoose.connection.once('open', () => {
    console.info('> Sucessfully connected to database');
})

server.get('/', (req, res) => {
  res.send('Successfully started rad.io-backend');
});

server.listen(settings.port, () => {
  console.info("> Started rad.io-backend on port " + settings.port);
});