import io from 'socket.io-client';

const socket = io.connect('http://localhost:9002');

socket.on('connect', function(data) {
  console.log('we\'re in business!');

  socket.on('ping', (data) => {
    socket.emit('pong', {my: 'data'});
  });
});

