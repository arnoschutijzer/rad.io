const socketJwt = require('socketio-jwt');
const Server = require('socket.io');
const settings = require('../config/settings');
const Room = require('../models/room');
const MusicRoom = require('./MusicRoom');
const rooms = {};
let rootSocket = {};

module.exports = initializeSocketServer;

function initializeSocketServer(httpServer) {
  rootSocket = new Server(httpServer);

  rootSocket.use(
    socketJwt.authorize({
      secret: settings.SECRET,
      handshake: true
    })
  );

  rootSocket.on('connection', (clientSocket) => {
    const user = clientSocket.decoded_token.user;
    // Keep a reference of the rooms we joined so we can later
    // post a 'disconnected' message
    clientSocket.___radRooms = [];

    // Events
    clientSocket.on('join', (roomId) => {
      Room.findOne({
        _id: roomId
      }).then((room) => {
        if (!rooms[roomId]) {
          rooms[roomId] = new MusicRoom(room, rootSocket.to(roomId));
        }
        
        // Send a message to the room when the user connects...
        rootSocket.to(roomId).send({
          message: 'Connected!',
          author: user
        });

        clientSocket.___radRooms.push(roomId);
        rooms[roomId].join(user._id, clientSocket);
      });
    });

    clientSocket.on('disconnect', () => {
      clientSocket.___radRooms.forEach((roomId) => {
        rooms[roomId].leave(user._id);
      });
    });

    clientSocket.on('add', (data) => {
      const { roomId } = data;

      if (!rooms.hasOwnProperty(roomId)) {
        return;
      }

      rooms[roomId].add(data, user._id);
    });

    clientSocket.on('rtv', (data) => {
      const { roomId } = data;
      rooms[roomId].rtv(user._id);      
    });

    clientSocket.on('message', (data) => {
      const { roomId } = data;
      rooms[roomId].sendMessage(Object.assign(data, {
        shouldNotify: true
      }));
    });
  });
}