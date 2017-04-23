const Server = require('socket.io');
let connections = 0;

function createServer(httpServer, port = 9002) {
  const socket = new Server(httpServer);

  socket.sockets.on('connection', (client) => {
    connections += 1;
    console.log(`Connection opened, ${connections} connections open`);

    /* Register handlers */
    client.on('disconnect', disconnect);
    client.on('message', (message) => {
      socket.sockets.send(message);
    });
  });

  socket.listen(port);
}

function disconnect(data) {
  connections -= 1;
  console.log(`Connection closed: ${data}, ${connections} connections open`);
}

module.exports = createServer;
