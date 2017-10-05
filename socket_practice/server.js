var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require("express-session");
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'}));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here

  socket.on( "button_clicked", function (data){
    console.log( 'Someone clicked a button!  Reason: '  + data.reason);
    socket.emit( 'server_response', {response:  "sockets are the best!"});
})
})
