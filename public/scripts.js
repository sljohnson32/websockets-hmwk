const socket = io();
let name = '';

$('#user-name').keyup((e) => {
  $('button').attr('disabled', e.target.value == "" ? true : false);
})

$('form').submit(() => {
  if (!name) {
    name = $('#user-name').val();
    $('#user-name').attr('value', name).attr('disabled', true);
  }
  socket.emit('chat message', { user: name, text: $('#m').val() });
  $('#m').val('');
  return false;
});

socket.on('chat message', (message) => {
  $('#messages').append($('<li>').html(`<h4>${message.user}: </h4><p>${message.text}</p>`));
});

socket.on('disconnected user', (message) => {
  $('#messages').append($('<li class="red">').text(message.text));
})

socket.on('connected user', (message) => {
  $('#messages').append($('<li class="green">').text(message.text));
})
