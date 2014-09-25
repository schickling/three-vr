var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/..'));

io.on('connection', function(socket) {

  socket.on('keydown', function(msg) {
    io.emit('keydown', msg);
  });

  socket.on('keyup', function(msg) {
    io.emit('keyup', msg);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
