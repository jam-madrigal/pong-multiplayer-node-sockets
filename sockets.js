// Variable for tracking how many players are ready
let readyPlayerCount = 0;

function listen(io) {
    // Naming our namespace
    const pongNamespace = io.of('/pong');
    // Registering an event listener for the connection event, which happens every time a user connects, and logging the user's socket id
    pongNamespace.on('connection', (socket) => {
        console.log('User connected', socket.id);
        // Listening for a user to connect and be ready, then incrementing our ready player count each time
        socket.on('ready', () => {
            console.log('Player ready', socket.id);
    
            readyPlayerCount++;
            // Broadcast the start game event when both players are ready, and send the player referee id, which will always be the second player in this case
            if (readyPlayerCount % 2 === 0) {
                pongNamespace.emit('startGame', socket.id);
            }  
        });
    
        // Taking paddle x position from the client and updating each client connection with it to make the game sync
        socket.on('paddleMove', (paddleData) => {
            socket.broadcast.emit('paddleMove', (paddleData));
        });
        // Taking emitted ball position, broadcasting it across clients
        socket.on('ballMove', (ballData) => {
            socket.broadcast.emit('ballMove', (ballData));
        });
    
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
        });
    });
}

module.exports = {
    listen
}
