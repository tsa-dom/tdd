const fs = require('fs')
const { Pool } = require('pg')
const { credentials } = require('../config')

const pool = new Pool(credentials)
let file = null
fs.readFile('../testdata.sql', 'utf8', (err, data) => {
  file = data
}, [file])

const initDb = async () => {
  const client = await pool.connect()
  client.query(file, () => {})
  client.end()
}

const clearDb = async () => {
  const client = await pool.connect()
  client.query('DROP TABLE todos', () => {})
  client.end()
}

module.exports = { initDb, clearDb }