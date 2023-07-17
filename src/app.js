const express = require('express')
const app = express()
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
app.use(express.json())

app.use('/api/blogs/', blogsRouter)

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
