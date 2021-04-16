/* Sondre Mokleiv Nygård
* Chat-application
 */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


http.listen(3000, () => {
    console.log('Listening on port *: 3000');
});

// Sockets som blir connected
io.on('connection', (socket) => {

    // Hvor mange sockets som er connected
    socket.emit('connections', Object.keys(io.sockets.connected).length);

    // Lytte på connections. Få forskjellige events fra client.
    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });

});