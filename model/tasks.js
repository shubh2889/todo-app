const mongoose = require('mongoose');

const mongooseDateFormat = require('mongoose-date-format'); 


const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    category : {
        type : String
    },
    dueDate : {
        type : Date,
        required : true,
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;