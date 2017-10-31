var body_parser = require('body-parser');
var mongoose = require('mongoose');


// Connect to the database
mongoose.connect('mongodb://test:test@ds237815.mlab.com:37815/todo_app', {useMongoClient: true});

// create a schema - this is like a blueprint 
var todo_schema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todo_schema);



var url_encoded_parser = body_parser.urlencoded({extended: false});

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass!'}];

module.exports = function(app){

    app.get('/', function(req, res){
        res.redirect('/todo');
    });

    app.get('/todo', function(req, res){
       
        // get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', url_encoded_parser, function(req, res){
        
        // get data from the view and add it to mongodb
        var new_todo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
    
}