import io from 'socket.io-client';
import { store } from '../state';
import { receiveUserlist } from '../state/actionCreators/users';
import { BASE } from '../config/config';

let socket;

const noop = () => {};

export const createConnection = (handler, token, roomId) => {
  if (socket) {
    socket.removeAllListeners();
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

    socket.on('disconnect', handler.onDisconnect || noop);
  });
  socket.on('message', handler.onMessage || noop);
  socket.on('play', handler.onPlay || noop);
  socket.on('notification', handler.onNotification || noop);
  socket.on('stop', handler.onStop || noop);
  socket.on('userlist', handler.onEvent || function(data) {
    store.dispatch(receiveUserlist(data));
  });

  return socket;
};
