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
app.use(session({
  secret: 'codingdojorocks',
  resave: true,
  saveUninitialized: true
}));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/result', function(req, res) {
  user = req.body;
 console.log(user.name);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.render("result", user);
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
