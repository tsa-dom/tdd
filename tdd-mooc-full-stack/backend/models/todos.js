const { Pool } = require('pg')
const credentials = require('../config')

class Todo {
  pool

  constructor() {
    this.pool = new Pool(credentials)
  }

  async insert(todo) {
    const client = await this.pool.connect()
    const query = 'INSERT INTO todos (name, done) VALUES ($1, false) RETURNING *'
    const result = await client.query(query, [todo.name])
    await client.end()
    return result.rows[0]
  }

  async get() {
    const client = await this.pool.connect()
    const query = 'SELECT * FROM todos'
    const result = await client.query(query)
    await client.end()
    return result.rows
  }
}

module.exports = Todo