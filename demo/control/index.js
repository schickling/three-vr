var socket = io();
var $body = document.querySelector('body');

$body.addEventListener('keydown', function(e) {
  socket.emit('keydown', {
    code: e.keyCode
  });
});

$body.addEventListener('keyup', function(e) {
  socket.emit('keyup', {
    code: e.keyCode
  });
});
