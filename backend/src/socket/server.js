const io = require('socket.io');

const createServer  = (httpServer, port = 9002) => {
  const server = io(httpServer);

  server.on('connection', (client) => {
    console.log('Connected to someone: ' + client);
  });

  server.listen(port);

  return server;
};

module.exports = createServer;
