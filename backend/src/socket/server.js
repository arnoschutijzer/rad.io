const Message = require('../models/message.js');
const Server = require('socket.io');
let connections = 0;

function createServer(httpServer, port = 9002) {
  const socket = new Server(httpServer);

  socket.sockets.on('connection', (client) => {
    connections += 1;
    console.log(`Connection opened, ${connections} connections open`);

    client.on('disconnect', disconnect);

    client.on('message', (message) => {
      const persistantMessage = new Message({
        content: {
          author: message.author._id,
          message: message.message
        }
      });

      persistantMessage.save((err) => {
        if (err) {
          console.log(err);
        }
      });

      console.log(`received message: ${message.author.username}: ${message.message}`);
      socket.sockets.send(message);
    });
  });

  socket.listen(port);

  return socket;
}

function disconnect(data) {
  connections -= 1;
  console.log(`Connection closed: ${data}, ${connections} connections open`);
}

module.exports = createServer;
