const ws = new WebSocket('ws://localhost:8080');

ws.onopen = (event) => {
  console.log(event);
};

ws.onmessage = (event) => {
  console.log(event);
};
