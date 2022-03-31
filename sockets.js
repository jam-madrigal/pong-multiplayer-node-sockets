// Variable for tracking how many players are ready
let readyPlayerCount = 0;

function listen(io) {
    // Naming our namespace
    const pongNamespace = io.of('/pong');
    let room;
    
    // Registering an event listener for the connection event, which happens every time a user connects, and logging the user's socket id
    pongNamespace.on('connection', (socket) => {
        console.log('User connected', socket.id);
        // Listening for a user to connect and be ready, then incrementing our ready player count each time
        socket.on('ready', () => {
            // Grouping players into pairs and using the socket's built in rooms to support more than 2 players
            // Name the rooms by player count, making sure the room is never named with a decimal by using Math.floor()
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log('Player ready', socket.id);
    
            readyPlayerCount++;
            // Broadcast the start game event when both players are ready, and send the player referee id, which will always be the second player in this case
            if (readyPlayerCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id);
            }  
        });
    
        // Taking paddle x position from the client and updating each client connection with it to make the game sync
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', (paddleData));
        });
        // Taking emitted ball position, broadcasting it across clients
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', (ballData));
        });
        
        // Handle disconnects and remove rooms when a user disconnects. Socket.io will leave rooms by default, but we want to be explicit
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(room);
        });
    });
}

module.exports = {
    listen
}
