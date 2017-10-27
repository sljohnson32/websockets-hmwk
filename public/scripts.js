const socket = io();
let typing = false;
let timeout = undefined;

const timeoutFunction = () => {
  typing = false;
  socket.emit('not typing', '');
}

const onTyping = () => {
  if (typing == false) {
    typing = true;
    let name = $('#account-info').attr('data-name');
    socket.emit('typing', `${name} is typing...`);
    timeout = setTimeout(timeoutFunction, 2000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 2000);
  }
}

$('#m').keyup((e) => {
  $('#send-message').attr('disabled', e.target.value == "" ? true : false);
})

$('#m').keydown(() => {
  onTyping();
});

$('.sign-in-out').on('click', toggleSignIn);

$('form').submit(() => {
  let name = $('#account-info').attr('data-name');
  socket.emit('chat message', { user: name, text: $('#m').val() });
  socket.emit('not typing', '');
  $('#m').val('');
  $('#send-message').attr('disabled', true);
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

socket.on('typing', (message) => {
  console.log(message.message)
  $('#typing-notification').text(message.message)
})

socket.on('not typing', () => {
  $('#typing-notification').text('')
})
