import React, { useEffect, useState } from 'react'
import { createTodo, getTodos } from '../services/todos'
import ArchiveList from './ArchiveList'
import TodoList from './TodoList'

const Todos = ({ archived }) => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(async () => {
    const fetchedTodos = await getTodos()
    setTodos(fetchedTodos)
  }, [])

  if (archived) return <ArchiveList todos={todos} />

  const handleSubmit = async () => {
    const addedTodo = await createTodo({ name: input })
    setTodos(todos.concat(addedTodo))
    setInput('')
  }

  return (
    <div id="todo-container">
      <h1>Todos</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <div style={{ marginTop: 10 }}>
        <input
          id='add-todo-input'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          style={{ marginLeft: 10 }}
          id='add-todo-button'
          onClick={handleSubmit}
        >Create todo</button>
      </div>
    </div>
  )
}

export default Todos