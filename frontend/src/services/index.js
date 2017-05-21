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

    if (handler.onConnect) {
      handler.onConnect(args);
    }
  });
  socket.on('message', handler.onMessage);
  socket.on('play', handler.onPlay);

  return socket;
};
