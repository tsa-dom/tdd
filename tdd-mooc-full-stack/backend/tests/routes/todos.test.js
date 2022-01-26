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

  it('the api returns an added todo', async () => {
    Todo.insert.mockResolvedValueOnce({ name: 'This is a new todo', done: false })
    const res = await axios.post('http://localhost:8081/api/todos', {
      name: 'This is a new todo'
    })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ name: 'This is a new todo', done: false })
  })

  it('the api returns all todos', async () => {
    Todo.get.mockResolvedValueOnce(todos)
    const res = await axios.get('http://localhost:8081/api/todos')
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ todos })
  })

  it('the api returns a modified todo', async () => {
    Todo.modify.mockResolvedValueOnce({ id: 2, name: 'Modify this todo', done: false })
    const res = await axios.put('http://localhost:8081/api/todos', {
      id: 2,
      name: 'Modify this todo',
      done: false
    })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ id: 2, name: 'Modify this todo', done: false })
  })

})

afterAll(() => {
  server.close()
})