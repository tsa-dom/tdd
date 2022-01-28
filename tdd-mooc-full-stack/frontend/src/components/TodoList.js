import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos=[], setTodos }) => {

  const updateTodo = (todo) => {
    setTodos(todos.map(t => t.id === todo.id ? todo : t))
  }

  return (
    <div id='todo-list'>
      {todos.map(todo => <Todo key={todo.id} todo={todo} updateTodo={updateTodo} />)}
    </div>
  )
}

export default TodoList
