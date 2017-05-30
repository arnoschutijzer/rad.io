const socketJwt = require('socketio-jwt');
const Server = require('socket.io');
const config = require('../config/settings');
const Message = require('../models/message');
const initMusicServer = require('./musicServer');
const rooms = {};
let rootSocket = {};

module.exports = function initializeSocketServer(httpServer) {
  rootSocket = new Server(httpServer);

  rootSocket.use(socketJwt.authorize({
    secret: config.secret,
    handshake: true
  }));

  rootSocket.on('connection', (clientSocket) => {
    clientSocket.on('join', data => {
      onJoin(clientSocket, data);

      // create a 'music server'
      if (!rooms[data]) {
        rooms[data] = initMusicServer(data, rootSocket.to(data));
      }
    });

    clientSocket.on('message', data => {
      onMessage(clientSocket, data);
    });

    clientSocket.on('disconnect', data => {
      onDisconnect(clientSocket, data);
    });

    clientSocket.on('add', (data) => {
      const enrichedData = Object.assign({}, {
        user: clientSocket.decoded_token._doc._id
      }, data);

      rooms[data.roomId].add(enrichedData);
    });
  });

  rootSocket.on('unauthorized', function(err){
    console.log('There was an error with the authentication:', err.message);
  });

  return rootSocket;
};

const onJoin = (clientSocket, data) => {
  clientSocket.join(data, () => {
    // We can't use the rooms property here to notify all the rooms of the disconnect,
    // since the property has already been cleared, so we define a property ___radRooms on the socket.
    clientSocket.___radRooms = clientSocket.rooms;

    sendMessage(data, {
      author: {
        username: 'System'
      },
      message: `${clientSocket.decoded_token._doc.username} connected`
    });
  });
};

const onDisconnect = (clientSocket) => {
  // We loop over the ___radRooms property to notify the rooms the user was last in.
  const keys = Object.keys(clientSocket.___radRooms).slice(1, clientSocket.___radRooms.length);
  const author = clientSocket.decoded_token._doc;
  keys.forEach(key => {
    sendMessage(key, {
      author: {
        username: 'System'
      },
      message: `${author.username} disconnected`
    });
  });
};

const onMessage = (clientSocket, data) => {
  // Just send the message to all the clients in the room,
  // the user that sent it will receive it as well, but this is desirable.
  // If the user doesn't see their message pop up, it hasn't arrived.
  rootSocket.to(data.room).send(data);

  const message = new Message({
    author: data.author._id,
    message: data.message,
    room: data.room,
  });

  message.save().catch((err) => {
    console.log('ERR_SAVING_MSG: ', err);
  });
};

const sendMessage = (room, data) => {
  rootSocket.to(room).send(data);
};