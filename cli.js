require('dotenv').config()

const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

const main = async () => {
    const blogs = await Blog.findAll()
    console.log(blogs)
}

const main2 = async () => {
    const response = await sequelize.query('SELECT * FROM blogs')
    console.log(JSON.stringify(response, null, 2))
    const blogs = response[0].map(blog => `author: ${blog.author}, ${blog.likes} likes`)
    console.log(blogs)
}

main2()