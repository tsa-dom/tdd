const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const { credentials } = require('../config')
const fs = require('fs')
const pool = new Pool(credentials)

let file = null
fs.readFile('../testdata.sql', 'utf8', (err, data) => {
  file = data
}, [file])

router.get('/hello', (req, res) => {
  pool.query('SELECT NOW()', (err) => {
    const message = err ? 'ERROR' : 'Hello world'
    res.send(message)
  })
})

router.get('/reset', (req, res) => {
  pool.query(file)
  res.sendStatus(200)
})

module.exports = router