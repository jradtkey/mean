var express = require("express");
var path = require("path");
var app = express();


app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})

app.post('/result', function(req, res) {
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.render("index");
})


var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here

  socket.on("button_click", function (data){
    data.count++;
    count = data.count;
    console.log(count);
    socket.emit('server_response', {response: count});
  })

  socket.on("reset_click", function (data){
    data.count = 0;
    count = data.count;
    socket.emit('server_response', {response: count});
  })
})
