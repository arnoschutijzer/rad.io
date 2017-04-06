const server = require('ws').Server;
const websocketServer = new server({port: 8080});

websocketServer.on('connection', (server) => {
  server.on('message', (msg) => {
    console.log(msg);
  });

  server.send('message from server');
});
