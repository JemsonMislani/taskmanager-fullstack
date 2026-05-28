const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    todo: String,
    date: String,
    status: {
        type: String,
        default: 'pending'
    }
})

const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel