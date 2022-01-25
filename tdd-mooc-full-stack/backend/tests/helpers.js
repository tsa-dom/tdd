const credentials = require('../config')
const fs = require('fs')
const { Pool } = require('pg')

const pool = new Pool(credentials)

const initDb = async () => {
  const client = await pool.connect()
  fs.readFile('../testdata.sql', 'utf8', (err, data) => {
    client.query(data, () => {})
    client.end()
  })
}

const clearDb = async () => {
  const client = await pool.connect()
  client.query('DROP TABLE todos', () => {})
  client.end()
}

module.exports = { initDb, clearDb }