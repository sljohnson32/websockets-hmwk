const socket = io();

$('#m').keyup((e) => {
  $('#send-message').attr('disabled', e.target.value == "" ? true : false);
})

$('.sign-in-out').on('click', toggleSignIn);

$('form').submit(() => {
  let name = $('#account-info').attr('data-name');
  console.log(name);
  socket.emit('chat message', { user: name, text: $('#m').val() });
  $('#m').val('');
  $('#send-message').attr('disabled', true)
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
