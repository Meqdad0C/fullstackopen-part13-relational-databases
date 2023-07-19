const Blog = require('./blog')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readers' })

Blog.hasMany(Readinglist)
Readinglist.belongsTo(Blog)

module.exports = {
  Blog,
  User,
  Team,
  Membership,
  Readinglist,
}
