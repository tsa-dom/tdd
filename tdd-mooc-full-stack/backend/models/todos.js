const { Pool } = require('pg')
const { credentials } = require('../config')

const todos = new Pool(credentials)

const insert = async (todo) =>  {
  const query = 'INSERT INTO todos (name, done) VALUES ($1, false) RETURNING *'
  const result = await todos.query(query, [todo.name])
  return result.rows[0]
}

const get = async () =>  {
  const query = 'SELECT * FROM todos'
  const result = await todos.query(query)
  return result.rows
}

module.exports = { insert, get }