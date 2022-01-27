const axios = require('axios')
const server = require('../..')
const { initDb } = require('../helpers')

const todos = [
  { id: 1, name: 'Go out', done: false },
  { id: 2, name: 'Do homework', done: false },
  { id: 3, name: 'Go to the school', done: true },
  { id: 4, name: 'Do food', done: false },
  { id: 5, name: 'Wash dishes', done: false }
]

beforeEach(async () => await initDb())

describe('Todo integration suite', () => {

  it('the api return an added todo from db', async () => {
    const res = await axios.post('http://localhost:8081/api/todos', {
      name: 'This is a new todo'
    })
    expect(res.errors).toBeUndefined()
    const id = res.data.todo.id
    expect(res.data).toEqual({ todo: { id, name: 'This is a new todo', done: false } })
  })

  it('the api returns all todos from db', async () => {
    const res = await axios.get('http://localhost:8081/api/todos')
    expect(res.errors).toBeUndefined()
    console.log(res.data)
    expect(res.data).toEqual({ todos })
  })

  it('the api returns a modified todo from db', async () => {
    const res = await axios.put('http://localhost:8081/api/todos', {
      id: 2,
      name: 'Modify this todo',
      done: false
    })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ todo: { id: 2, name: 'Modify this todo', done: false } })
  })

})

afterAll(() => {
  server.close()
})