var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require("express-session");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
 res.render("index");
})

var users = {};
var user;

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here

  socket.on( "name_input", function (data){

    user = data.data;
    users[socket.id] = user;
    console.log(users);
    socket.broadcast.emit('server_response', {response:user});
    socket.emit("show_users", {users: users});
  })
})
