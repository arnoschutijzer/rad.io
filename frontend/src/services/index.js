import io from 'socket.io-client';
import { BASE } from '../config/config';

let socket;

const noop = () => {};

export const createConnection = (handler, token, roomId) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io.connect(BASE, {
    'query': 'token=' + token
  });
  socket.on('connect', (args) => {
    socket.emit('join', roomId);

    if (handler.onConnect) {
      handler.onConnect(args);
    }
  });
  socket.on('message', handler.onMessage || noop);
  socket.on('play', handler.onPlay || noop);
  socket.on('notification', handler.onNotification || noop);

  return socket;
};
