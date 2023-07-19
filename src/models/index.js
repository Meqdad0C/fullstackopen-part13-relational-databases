const Blog = require('./blog')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })
// User.sync({ alter: true })
// Blog.sync({ alter: true })

module.exports = {
  Blog,
  User,
  Team,
  Membership,
}
