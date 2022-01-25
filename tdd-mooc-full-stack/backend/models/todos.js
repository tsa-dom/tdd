const { Pool } = require('pg')

const credentials = {
  user: 'postgres',
  password: 'secret',
  port: 5555,
  database: 'postgres',
  host: '0.0.0.0'
}

class Todo {
  pool

  constructor() {
    this.pool = new Pool(credentials)
  }

  async insert(todo) {
    const client = await this.pool.connect()
    const query = 'INSERT INTO todos (name, done) VALUES ($1, false) RETURNING *'
    const result = await client.query(query, [todo.name])
    const { name, done } = result.rows[0]
    return { name, done }
  }
}

module.exports = Todo