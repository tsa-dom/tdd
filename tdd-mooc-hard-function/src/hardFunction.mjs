const axios = require('axios')
const fs = require('fs').promises

const hardFunction = async () => {
  let res
  try {
    // Network socket
    res = await axios.get('http://localhost:8088/api/')
  } catch (err) {
    return undefined
  }

  // Time
  const apiDate = new Date(res.dateString)
  const now = new Date()

  // Random
  const newMonth = Math.floor(Math.random() * 12)

  apiDate.setMonth(newMonth)
  const dayDiff = Math.round((now - apiDate) / (1000 * 60 * 60 * 24))

  let secretNumber
  try {
    // File system, read
    secretNumber = await fs.readFile('./secret.txt', 'utf8')
  } catch (err) {
    return undefined
  }
  const result = Number(secretNumber) + dayDiff
  try {
    // File system, write
    await fs.writeFile('./result.txt', result)
  } catch (err) {
    return undefined
  }

  return result
}

module.exports = { hardFunction }