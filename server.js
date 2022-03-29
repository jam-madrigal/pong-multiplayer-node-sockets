const server = require('http').createServer();
// Importing socket.io and attaching it to our server
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});

// Registering an event listener for the connection event, which happens every time a user connects
io.on('connection', (socket) => {
    console.log('User connected');
});