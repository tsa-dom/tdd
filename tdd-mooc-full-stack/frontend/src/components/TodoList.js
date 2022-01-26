import React, { useEffect, useState } from 'react'
import { getTodos } from '../services/todos'

const TodoList = () => {
  const [todos, setTodos] = useState([])

  useEffect(async () => {
    const fetchedTodos = await getTodos()
    setTodos(fetchedTodos)
  }, [])

  return (
    <div id='todo-list'>
      <h1>Todos</h1>
      <div style={{ marginLeft: 50 }}>
        {todos && todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
      </div>
    </div>
  )
}

export default TodoList
