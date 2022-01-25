const testMode = process.env.NODE_ENV === 'test' ? true : false

const credentials = {
  user: 'postgres',
  password: 'secret',
  port: testMode ? 5556 : 5555,
  database: testMode ? 'testdb' : 'postgres',
  host: '0.0.0.0'
}

module.exports = credentials