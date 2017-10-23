const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('connected user', {text: 'Someone has connected'});
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected user', {text: 'Someone was disconnected'});
    console.log('user disconnected');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
