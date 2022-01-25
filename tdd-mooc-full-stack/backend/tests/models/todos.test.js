const Todo = require('../../models/todos')
const todos = new Todo()

describe('Todo model suite', () => {

  it('a todo is added to a database', async () => {
    const addedTodo = await todos.insert({ name: 'This is a wonderful todo' })
    expect(addedTodo).toEqual({ name: 'This is a wonderful todo', done: false })
  })

})