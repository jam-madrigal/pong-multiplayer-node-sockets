const api = require('./api');

const server = require('http').createServer(api);
// Importing socket.io and attaching it to our server
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

const sockets = require('./sockets');

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});

sockets.listen(io);
// Variable for tracking how many players are ready

