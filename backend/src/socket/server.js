const socketJwt = require('socketio-jwt');
const Server = require('socket.io');
const config = require('../config/settings');
const User = require('../models/user');
const Message = require('../models/message');
const notificationTypes = require('../models/constants').notifications;
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
    const user = clientSocket.decoded_token.user;

    clientSocket.on('join', roomId => {
      clientSocket.join(roomId, () => {
        // We can't use the rooms property here to notify all the rooms of the disconnect,
        // since the property has already been cleared, so we define a property ___radRooms on the socket.
        clientSocket.___radRooms = clientSocket.rooms;
        clientSocket.___radUser = user;

        sendMessage(roomId, {
          author: {
            username: 'System'
          },
          message: `${user.username} connected`
        });
      });

      // create a 'music server'
      if (!rooms[roomId]) {
        rooms[roomId] = initMusicServer(roomId, rootSocket.to(roomId),
          user._id);
      } else {
        rooms[roomId].join(user._id);
      }

      initializeClientRoom(clientSocket, rooms[roomId]);
    });

    clientSocket.on('message', (data) => {
      const { roomId } = data;

      if (!isInRoom(clientSocket, roomId)) {
        return;
      }

      onMessage(Object.assign(data, {
        shouldNotify: true
      }));
    });

    clientSocket.on('disconnect', () => {
      let keys;

      if (!clientSocket || !clientSocket.__radRooms) {
        return;
      }
      // We loop over the ___radRooms property to notify the rooms the user was last in.
      try {
        keys = Object.keys(clientSocket.___radRooms).slice(1, clientSocket.___radRooms.length);
      } catch(error) {
        console.error(error);
        console.trace();
      }

      keys.forEach(key => {

        rooms[key].leave(user);

        sendMessage(key, {
          author: {
            username: 'System'
          },
          message: `${user.username} disconnected`
        });
      });
    });

    clientSocket.on('add', (data) => {
      const { roomId } = data;
      if (!isInRoom(clientSocket, roomId)) {
        return;
      }

      const enrichedData = Object.assign({}, {
        user
      }, data);

      rooms[roomId].add(enrichedData).then(() => {
        sendNotification(clientSocket, {
          type: notificationTypes.info,
          message: 'Successfully added'
        });
      }).catch((err) => {
        console.log(err);

        sendNotification(clientSocket, {
          type: notificationTypes.error,
          message: err || 'Failed to add video'
        });
      });

    });

    clientSocket.on('rtv', (data) => {
      if (!isInRoom(clientSocket, data.roomId)) {
        return;
      }

      const { roomId } = data;
      rooms[roomId].rtv(user._id).then(() => {

      }).catch((err) => {
        sendNotification(clientSocket, {
          type: notificationTypes.error,
          message: err
        });
      });
    });
  });

  rootSocket.on('unauthorized', function(err){
    console.log('There was an error with the authentication:', err.message);
  });

  return rootSocket;
};

const onMessage = (data) => {
  // Just send the message to all the clients in the room,
  // the user that sent it will receive it as well, but this is desirable.
  // If the user doesn't see their message pop up, it hasn't arrived.
  rootSocket.to(data.roomId).send(data);

  const message = new Message({
    author: data.author._id,
    message: data.message,
    room: data.roomId,
  });

  message.save().catch((err) => {
    console.log('ERR_SAVING_MSG: ', err);
  });
};

const isInRoom = (socket, roomId) => {
  if (!socket || !socket.rooms || !socket.rooms.hasOwnProperty(roomId)) {
    return false;
  }

  return true;
};

const sendMessage = (room, data) => {
  rootSocket.to(room).send(data);
};

const initializeClientRoom = (socket, room) => {
  User.find({
    '_id': { $in: room.users }
  }).then((users) => {
    socket.emit('userlist', users);
  });
};

const sendNotification = (clientSocket, data) => {
  clientSocket.emit('notification', data);
};