// require express
var express = require("express");
var session = require("express-session");
var path = require("path");
// create the express app
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
  if (!('count' in req.session)) {
    req.session.count = 1;
  }
  else {
    req.session.count += 2;
  }
 res.render("index", {count: req.session.count});
})

app.post('/counter', function(req, res) {
  res.redirect('/');
});

app.post('/reset', function(req, res) {

  delete req.session.count;

  console.log(req.session.count);
  res.redirect('/');
});


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
