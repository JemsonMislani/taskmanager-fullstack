const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/tasks')
.then(result => console.log('Backend is running!'))
.catch(err => console.log(err))

PORT = 3005
app.listen(PORT, () => {
    console.log('Jem your server is running!')
})