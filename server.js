const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', (socket) => {
  socket.broadcast.emit('connected user', {text: 'Someone has connected'});
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected user', {text: 'Someone was disconnected'});
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('typing', (message) => {
    socket.broadcast.emit('typing', message);
  })

  socket.on('not typing', (message) => {
    socket.broadcast.emit('notTyping', message);
  })

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
