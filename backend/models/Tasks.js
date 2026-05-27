const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    todo: String,
    date: String
})

const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel