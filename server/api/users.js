const router = require('express').Router()
const req = require('express/lib/request')
const { models: { User, Task } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/tasks', async (req, res, next) => {
  try {
    console.log("// [/api/:userId/tasks] - req: ", req)
    console.log("// [/api/:userId/tasks] - req.params: ", req.params)
    const userTasks = await Task.findAll({ where: { userId: req.params.userId } })
    res.json(userTasks)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/tasks/:taskId', async (req, res, next) => {
  try {
    const singleTask = await Task.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.taskId
      }
    })
    res.json(singleTask)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/tasks', async (req, res, next) => {
  try {
    console.log("// [ POST /api/:userId/tasks] - req.params: ", req.params)
    console.log("// [ POST /api/:userId/tasks ] - req.body: ", req.body)
    const newTask = req.body;
    newTask.userId = req.params.userId;
    res.status(201).send(await Task.create(newTask))
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/tasks/:taskId', async (req, res, next) => {
  try {
    console.log("// [ PUT /api/:userId/tasks ] - req.body: ", req.body)
    console.log("// [ PUT /api/users/userId/tasks/:taskId ] - req.params: ", req.params)
    const taskToBeUpdated = await Task.findByPk(req.params.taskId);
    const updatedTask = await taskToBeUpdated.update(req.body);
    res.send(updatedTask)
  } catch (error) {
    next(error)
  }
})
