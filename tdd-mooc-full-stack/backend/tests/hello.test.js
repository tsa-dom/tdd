const { hello } = require('../.')

it('Hello world', () => {
  const result = hello()
  expect(result).toEqual('Hello world')
})