const app = require('./src/app')
const { PORT } = require('./src/util/config')
const { connectToDatabase } = require('./src/util/db')

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
