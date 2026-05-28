const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const TaskModel = require('./models/Tasks')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/task_fullstack')
.then(result => console.log('Backend is running!'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    TaskModel.find({})
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    TaskModel.create(req.body)
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

app.get('/getTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findById(id)
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

app.put('/updateTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(
        id,
        {
            todo: req.body.todo,
            date: req.body.date
        }
    )
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

app.patch('/completeTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(
        id,
        { status : 'completed'},
        { new: true }
    )
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

app.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete(id)
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

const PORT = 3005
app.listen(PORT, () => {
    console.log('Jem your server is running!')
})