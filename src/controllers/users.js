const router = require('express').Router()
const { Team } = require('../models')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
    {
      model: Team,
      attributes: ['name', 'id'],
      through: {
        attributes: []
      }
    }],
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  user.name = req.body.name
  await user.save()
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
