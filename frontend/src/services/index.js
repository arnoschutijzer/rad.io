import io from 'socket.io-client';

let socket;

export const createConnection = (handler, token, roomId) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io.connect('http://localhost:9002', {
    'query': 'token=' + token
  });
  socket.on('connect', (args) => {
    socket.emit('join', roomId);
    handler.onConnect(args);
  });
  socket.on('message', handler.onMessage);

  return socket;
};
