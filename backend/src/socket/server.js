const socketJwt = require('socketio-jwt');
const Server = require('socket.io');
const config = require('../config/settings');
const Message = require('../models/message');
var Link = require('../models/link');
let rootSocket = {};

module.exports = function createServer(httpServer, port = 9002) {
  rootSocket = new Server(httpServer);

  rootSocket.use(socketJwt.authorize({
    secret: config.secret,
    handshake: true
  }));

  rootSocket.on('connection', (clientSocket) => {
    clientSocket.on('join', data => {
      onJoin(clientSocket, data);
    });

    clientSocket.on('message', data => {
      onMessage(clientSocket, data);
    });

    clientSocket.on('disconnect', data => {
      onDisconnect(clientSocket, data);
    });

    clientSocket.on('add', (data) => {
      onAdd(clientSocket, data);
    });
  });

  rootSocket.on('unauthorized', function(err){
    console.log('There was an error with the authentication:', err.message);
  });

  rootSocket.listen(port);
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

const onAdd = (clientSocket, data) => {
  const link = new Link({
    originalUrl: data.url,
    videoId: 'derp',
    submitter: clientSocket.decoded_token._doc._id,
    room: data.roomId
  });

  link.save().then(() => {
    clientSocket.send({
      author: {
        username: 'System'
      },
      message: 'Successfully added!'
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