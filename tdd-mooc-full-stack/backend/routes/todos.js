const express = require('express')
const Todo = require('../models/todos')
const router = express.Router()

router.get('/todos', async (req, res) => {
  const todos = await Todo.get()
  res.send({ todos })
})

router.post('/todos', async (req, res) => {
  const addedTodo = await Todo.insert({ ...req.body })
  res.send(addedTodo)
})

module.exports = router