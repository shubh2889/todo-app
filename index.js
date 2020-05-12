const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');

const Task = require('./model/tasks');

const app = express();

// moment 
const moment = require('moment');
app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
});

// middlewhere
app.use(express.urlencoded());

// assets
app.use(express.static('assets'));

// view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname,'views'));


// adding new task

app.post('/new-task', function(req, res){
    Task.create({
        description : req.body.description,
        category : req.body.category,
        dueDate : req.body.dueDate
    }, function(err, newTask){
        if(err){
            console.log('error in adding new task');
            return;
        };
        return res.redirect('back');
    });
});

// for deleting task

app.get('/delete-task/:id', function(req, res){
    let arr = req.params.id.split(',');
    console.log(arr);
    Task.deleteMany({_id:{$in:arr}},function(err){
        if(err){
            console.log('error');
            return;
        };
        return res.redirect('back');
    });
});

// rendering ejs file

app.get('/', function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            console.log('error in fetching task');
            return;
        }

        return res.render('home',{
            title: "TODO APP",
            task_list: tasks
        });
    });
});

// connecting to server 

app.listen(port, function(err, data){
    if(err){
        console.log(`Error! ${err}`);
    }
    console.log(`Yup my server is running on port: ${port}`);
});
