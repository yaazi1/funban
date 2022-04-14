//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Task = require('./models/Task')

//associations could go here!
User.hasMany(Task)
Task.belongsTo(User)


module.exports = {
  db,
  models: {
    User,
    Task
  },
}
