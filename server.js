const http = require('http');
const io = require('socket.io');

const api = require('./api');
// Passing in our express function to make it listen to requests on the server
const httpServer = http.createServer(api);
// Importing socket.io and attaching it to our server
const socketServer = io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

const sockets = require('./sockets');

const PORT = 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});

// Server is listening to events in our sockets file
sockets.listen(socketServer);

