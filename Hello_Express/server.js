var express = require("express");
var bodyParser = require('body-parser');
var app = express();

// root route
app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});
// route to process new user form data:
app.post('/users', function (req, res){
  // code to add user to db goes here!
  console.log("POST DATA \n\n", req.body);
  // redirect the user back to the root route.
  // All we do is specify the URL we want to go to:
  res.redirect('/');
})

app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});


app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: true}));


app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');


app.listen(8000, function() {
  console.log("listening on port 8000");
})
