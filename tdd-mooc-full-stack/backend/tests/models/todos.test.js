const Todo = require('../../models/todos')
const { initDb, clearDb } = require('../helpers')
const todos = new Todo()

const allTodos = [
  { id: 1, name: 'Go out', done: false },
  { id: 2, name: 'Do homework', done: false },
  { id: 3, name: 'Go to the school', done: true },
  { id: 4, name: 'Do food', done: false },
  { id: 5, name: 'Wash dishes', done: false },
]

beforeEach(async () => await initDb())

describe('Todo model suite', () => {

  it('a todo is added to a database', async () => {
    const addedTodo = await todos.insert({ name: 'This is a wonderful todo' })
    expect(addedTodo.id).toBeDefined()
    expect(addedTodo).toEqual({ id: addedTodo.id, name: 'This is a wonderful todo', done: false })
  })

  it('todos are fetched from the database', async () => {
    const res = await todos.get()
    expect(res).toEqual(allTodos)
  })

})

afterEach(async () => await clearDb())