const io = require('socket.io');

const createServer  = (httpServer, port = 9002) => {
  const server = io(httpServer);

  server.on('connection', (client) => {
    console.log('Connected to someone: ' + client);

    setInterval(() => {
      client.emit('ping', {'hello': 'world'});
    }, 5000);

    client.on('pong', (client) => {
      console.log('successfully ping-ponged');
    });
  });

  server.listen(port);

  return server;
};

module.exports = createServer;
