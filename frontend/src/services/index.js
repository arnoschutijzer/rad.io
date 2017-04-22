import io from 'socket.io-client';

let socket;

export const createConnection = (handler) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io.connect('http://localhost:9002');
  socket.on('connect', handler.onConnect);
};
