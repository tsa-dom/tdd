import axios from 'axios'
const { getTodos } = require('./todos')

const todos = [
  { name: 'Buy some milk', done: false },
  { name: 'Clean room', done: false },
  { name: 'Do your home work', done: false }
]

jest.mock('axios')

test('todos are fetched from the api', async () => {
  axios.get.mockResolvedValueOnce({ data: { todos } })
  const fetchedTodos = await getTodos()
  expect(fetchedTodos).toEqual(todos)
})