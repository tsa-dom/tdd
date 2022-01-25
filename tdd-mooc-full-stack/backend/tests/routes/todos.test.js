const server = require('../..')
const axios = require('axios')

describe('Todo route suite', () => {

  it('a user is able to add a new todo', async () => {
    const res = await axios.post('http://localhost:8081/api/todos', {
      todo: 'This is a new todo'
    })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      todo: 'This is a new todo'
    })
  })

})

afterAll(() => {
  server.close()
})