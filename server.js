const api = require('./api');
// Passing in our express function to make it listen to requests on the server
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

// Server is listening to events in our sockets file
sockets.listen(io);

