const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const { credentials } = require('../config')

router.get('/hello', (req, res) => {
  const pool = new Pool(credentials)
  pool.query('SELECT NOW()', (err) => {
    const message = err ? 'ERROR' : 'Hello world'
    res.send(message)
    pool.end()
  })
})

module.exports = router