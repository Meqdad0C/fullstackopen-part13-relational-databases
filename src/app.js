const express = require('express')
const app = express()
require('express-async-errors')

const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use('/', (req, res) => {
  res.send('Hello World!')
})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(404).json({ error })
})
module.exports = app
