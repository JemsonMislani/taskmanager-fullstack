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

const PORT = 3005
app.listen(PORT, () => {
    console.log('Jem your server is running!')
})