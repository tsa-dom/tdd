const Todo = require('../../models/todos')
const { initDb } = require('../helpers')

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
    const addedTodo = await Todo.insert({ name: 'This is a wonderful todo' })
    expect(addedTodo.id).toBeDefined()
    expect(addedTodo).toEqual({ id: addedTodo.id, name: 'This is a wonderful todo', done: false })
  })

  it('todos are fetched from the database', async () => {
    const res = await Todo.get()
    expect(res).toEqual(allTodos)
  })

  it('a todo is modified in the database', async () => {
    const modifiedTodo = await Todo.modify({ id: 2, name: 'This is going to modified', done: true })
    expect(modifiedTodo).toEqual({ id: 2, name: 'This is going to modified', done: true })
  })

  it('a todo cannot be modified if it\'s not in the database', async () => {
    const modifiedTodo = await Todo.modify({ name: 'This is going to modified', done: true })
    expect(modifiedTodo).toBeUndefined()
  })

  it('a todo cannot be modified if undefiend is given', async () => {
    const modifiedTodo = await Todo.modify()
    expect(modifiedTodo).toBeUndefined()
  })

  it('a todo is modified partly if some fields are missing', async () => {
    const modifiedTodo = await Todo.modify({ id: 2, done: true })
    expect(modifiedTodo).toEqual({ id: 2, name: 'Do homework', done: true })
  })

  it('a todo is not modified if only id is specified', async () => {
    const modifiedTodo = await Todo.modify({ id: 2 })
    expect(modifiedTodo).toEqual({ id: 2, name: 'Do homework', done: false })
  })

})