const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { User, Session } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const sessionFrom = async (token) => {
  return await Session.findOne({
    where: {
      token,
    },
    include: {
      model: User,
    },
  })
}

const userFromToken = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }
  const session = await sessionFrom(authorization.substring(7))

  if (!session) {
    return res.status(401).json({ error: 'no valid session' })
  }

  if (session.user.disabled) {
    return res.status(401).json({ error: 'account disabled' })
  }
  req.user = session.user

  next()
}

module.exports = { tokenExtractor, userFromToken }
