const axios = require('axios')
const server = require('../..')
const Todo = require('../../models/todos')
jest.mock('../../models/todos')

const todos = [
  { id: 1, name: 'Go out', done: false },
  { id: 2, name: 'Do homework', done: false },
  { id: 3, name: 'Go to the school', done: true },
]

describe('Todo route suite', () => {

  it('add a new todo to the api', async () => {
    Todo.insert.mockResolvedValueOnce({ name: 'This is a new todo', done: false })
    const res = await axios.post('http://localhost:8081/api/todos', {
      name: 'This is a new todo'
    })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ name: 'This is a new todo', done: false })
  })

  it('get all todos from the api', async () => {
    Todo.get.mockResolvedValueOnce(todos)
    const res = await axios.get('http://localhost:8081/api/todos')
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ todos })
  })

})

afterAll(() => {
  server.close()
})