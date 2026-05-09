const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('API Running')
})

app.listen(process.env.PORT, () => {
  console.log('Server running')
})