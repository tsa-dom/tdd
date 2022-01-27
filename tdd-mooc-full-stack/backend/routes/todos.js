const express = require('express')
const Todo = require('../models/todos')
const router = express.Router()

router.get('/todos', async (req, res) => {
  const todos = await Todo.get()
  res.send({ todos })
})

router.post('/todos', async (req, res) => {
  const addedTodo = await Todo.insert({ ...req.body })
  res.send({ todo: addedTodo })
})

router.put('/todos', async (req, res) => {
  const modifiedTodo = await Todo.modify({ ...req.body })
  res.send({ todo: modifiedTodo })
})

module.exports = router