const express = require('express')
const app = express()
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authorRouter = require('./controllers/authors')
const readinglistRouter = require('./controllers/readinglists')
const sessionsRouter = require('./controllers/sessions')

app.use(express.json())


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readinglistRouter)
app.use('/api', sessionsRouter)

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
