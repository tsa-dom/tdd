const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
const port = 8080

const credentials = {
  user: 'postgres',
  password: 'secret',
  port: 5555,
  database: 'postgres',
  host: '0.0.0.0'
}

app.get('/api/hello', (req, res) => {
  const pool = new Pool(credentials)
  pool.query('SELECT NOW()', (err) => {
    const message = err ? 'ERROR' : 'Hello world'
    res.send(message)
    pool.end()
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})