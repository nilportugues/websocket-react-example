import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToTimer(callback) {
  socket.on('timer', timestamp => callback(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}


function sendForm(jsonObject) {
    socket.emit('client-event', JSON.stringify(jsonObject));
}

export { subscribeToTimer };
export { sendForm };
