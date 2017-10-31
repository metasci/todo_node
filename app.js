var express = require('express');
var todoController = require('./controllers/todoController');


var app = express();

// set up template engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('./public'));


// fire controllers
todoController(app);
var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('listening on port '+port);
});