const mode = process.env.NODE_ENV
const testMode = (mode === 'test' || mode === 'e2e') ? true : false
const port = mode === 'test' ? 8081 : 8080

const credentials = {
  user: 'postgres',
  password: 'secret',
  port: testMode ? 5556 : 5555,
  database: testMode ? 'testdb' : 'postgres',
  host: '0.0.0.0'
}

module.exports = { credentials, port }