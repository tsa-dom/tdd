import React from 'react'

const TodoList = ({ todos=[] }) => {

  return (
    <div id='todo-list'>
      {todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
    </div>
  )
}

export default TodoList
