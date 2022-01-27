import axios from 'axios'
const { getTodos, createTodo, modifyTodo } = require('./todos')

const todos = [
  { name: 'Buy some milk', done: false },
  { name: 'Clean room', done: false },
  { name: 'Do your home work', done: false }
]

jest.mock('axios')

describe('get todos from the api', () => {

  it('successful fetch return todos', async () => {
    axios.get.mockResolvedValueOnce({ data: { todos } })
    const fetchedTodos = await getTodos()
    expect(fetchedTodos).toEqual(todos)
  })

  it('unsuccessful fetch return null', async () => {
    axios.get.mockResolvedValueOnce(new Error('Unknown error'))
    const fetchedTodos = await getTodos()
    expect(fetchedTodos).toBeNull()
  })

})

describe('add a todo to the api', () => {

  it('successful addition return the todo', async () => {
    axios.post.mockResolvedValueOnce({ data: { todo: { id: 1, name: 'Do an awesome thing', done: false } } })
    const createdTodo = await createTodo({ name: 'Do an awesome thing' })
    expect(createdTodo).toEqual({ id: 1, name: 'Do an awesome thing', done: false })
  })

  it('unsuccessful addition returns null', async () => {
    axios.post.mockResolvedValueOnce(new Error('Unknown error'))
    const createdTodo = await createTodo({ name: 'Do an awesome thing' })
    expect(createdTodo).toBeNull()
  })

})

describe('modify an existing todo to the api', () => {

  it('an existing todo is modified trought the api', async () => {
    axios.put.mockResolvedValueOnce({ data:{ todo: { id: 1, name: 'This is a modification', done: false } } })
    const modifiedTodo = await modifyTodo({ id: 1, name: 'Some milk', done: false })
    expect(modifiedTodo).toEqual({ id: 1, name: 'This is a modification', done: false })
  })

  it('unsuccessful modification returns null', async () => {
    axios.post.mockResolvedValueOnce(new Error('Unknown error'))
    const modifiedTodo = await modifyTodo({ id: 1, name: 'This is a modification', done: false })
    expect(modifiedTodo).toBeNull()
  })

})