const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const { credentials } = require('../config')
const { initDb } = require('../tests/helpers')

router.get('/hello', (req, res) => {
  const pool = new Pool(credentials)
  pool.query('SELECT NOW()', (err) => {
    const message = err ? 'ERROR' : 'Hello world'
    res.send(message)
    pool.end()
  })
})

router.get('/reset', async (req, res) => {
  await initDb()
  res.sendStatus(200)
})

module.exports = router