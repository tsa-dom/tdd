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

const modify = async (todo) => {
  if (!todo || !todo.id) return undefined
  const values = []
  const fields = []
  let index = 2
  values.push(todo.id)
  for (let property in todo) {
    if (property === 'id') continue
    fields.push(`${property}=($${index})`)
    values.push(todo[property])
    index++
  }
  const query = fields.length
    ? 'UPDATE todos SET ' + fields.join(', ') + ' WHERE id=($1) RETURNING *'
    : 'SELECT * FROM todos WHERE id=($1)'
  const result = await todos.query(query, values)
  return result.rows[0]
}

module.exports = { insert, get, modify }