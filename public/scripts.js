const socket = io();

$('form').submit(() => {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', (message) => {
  $('#messages').append($('<li>').text(message));
});

socket.on('disconnected user', (message) => {
  $('#messages').append($('<li class="red">').text(message.text));
})

socket.on('connected user', (message) => {
  $('#messages').append($('<li class="green">').text(message.text));
})
