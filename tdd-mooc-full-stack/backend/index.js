const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const fs = require('fs')
const credentials = require('./config')

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.NODE_ENV === 'test' ? 8081 : 8080

const pool = new Pool(credentials)
fs.readFile('../schema.sql', 'utf8', (err, data) => {
  pool.query(data, () => {})
  pool.end()
})

app.get('/api/hello', (req, res) => {
  const pool = new Pool(credentials)
  pool.query('SELECT NOW()', (err) => {
    const message = err ? 'ERROR' : 'Hello world'
    res.send(message)
  })
  pool.end()
})

app.post('/api/todos', (req, res) => {
  if (process.env.NODE_ENV === 'test') res.send({ ...req.body })
})

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

module.exports = server