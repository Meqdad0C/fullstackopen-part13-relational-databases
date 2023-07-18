const { Blog } = require('../models')
const sequelize = require('sequelize')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('*')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [[sequelize.col('likes'), 'DESC']],
  })
  res.json(authors)
})

module.exports = router
