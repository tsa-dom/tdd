const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const fs = require('fs')
const todoRouter = require('./routes/todos')
const helloRouter = require('./routes/hello')
const { credentials, port } = require('./config')

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool(credentials)
fs.readFile('../schema.sql', 'utf8', (err, data) => {
  pool.query(data, () => {})
  pool.end()
})

app.use('/api', [todoRouter, helloRouter])

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

module.exports = server