var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var todos_db = require("./seed.js");
app.use("/",bodyParser.urlencoded({extended: false}));
app.use("/",express.static(__dirname +"/public"));
app.get("/api/todos",function(req,res) {
res.json(todos_db.todos);
});
app.delete("/api/todos/:id", function(req, res){
    var del_id = req.params.id;
    var todo = todos_db.todos[del_id];
    if(!todo){
        res.status(400).json({error: "Todo doesn't exist."})
    }
    else{
        todo.status = todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }
});
app.post("/api/todos", function(req, res){
    var todo = req.body.todo_title;

    // if you don't send a todo_title

    if (!todo || todo == "" || todo.trim() == ""){
        res.status(400).json({error : "Todo Title Can't Be Empty"});
    }

    else {
        var  new_todo_object= {
            title : req.body.todo_title,
            status: todos_db.StatusENUMS.ACTIVE
        }


        todos_db.todos[todos_db.next_todo_id] =  new_todo_object;
        todos_db.next_todo_id = todos_db.next_todo_id + 1;
        res.json(todos_db.todos);

    }

});
app.put("/api/todos/:id", function(req,res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    if(!todo){
        res.status(400).json({error: "Couldn't modify a todo that doesn't exist"});
    }
    else{
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title !="" && todo_title.trim() !="" ){
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if(todo_status && (todo_status == todos_db.StatusENUMS.ACTIVE || todo_status == todos_db.StatusENUMS.COMPLETE)){
            todo.status = todo_status;
        }
        res.json(todos_db.todos);
    }
});
app.get("/api/todos/active", function(req, res){
    var active_todo_object ={};
    for(var key in todos_db.todos){
        if(todos_db.todos[key].status == todos_db.StatusENUMS.ACTIVE){
            active_todo_object[key] = todos_db.todos[key];
        }
    }
    res.json(active_todo_object);
});
app.get("/api/todos/complete", function(req,res) {
    var complete_todo_object = {};
   for(var key in todos_db.todos){
       if(todos_db.todos[key].status == todos_db.StatusENUMS.COMPLETE){
           complete_todo_object[key] = todos_db.todos[key];
       }
   }
   res.json(complete_todo_object);
});
app.get("/api/todos/deleted", function(req,res) {
    var deleted_todo_object = {};
    for(var key in todos_db.todos){
        if(todos_db.todos[key].status == todos_db.StatusENUMS.DELETED){
            deleted_todo_object[key] = todos_db.todos[key];
        }
    }
    res.json(deleted_todo_object);
});
app.put("/api/todos/complete/:id", function(req,res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    if(!todo){
        res.status(400).json({error: "Couldn't modify a todo that doesn't exist"});
    }
    else{

       todo.status = todos_db.StatusENUMS.COMPLETE;
       res.json(todos_db.todos);
    }
});
app.put("/api/todos/active/:id", function(req,res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    if(!todo){
        res.status(400).json({error: "Couldn't modify a todo that doesn't exist"});
    }
    else{
        todo.status = todos_db.StatusENUMS.ACTIVE;
        res.json(todos_db.todos);
    }
});

app.listen(3000);