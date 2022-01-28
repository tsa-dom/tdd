import React, { useState } from 'react'
import { modifyTodo } from '../services/todos'

const Todo = ({ todo, updateTodo }) => {
  const [name, setName] = useState(null)

  const handleNameChange = async () => {
    try {
      const modifiedTodo = await modifyTodo({ id: todo.id, name })
      updateTodo(modifiedTodo)
    } catch (err) {null}
    setName(null)
  }

  const handleDone = async () => {
    try {
      const todoDone = await modifyTodo({ id: todo.id, done: true })
      updateTodo(todoDone)
    } catch (err) {null}
  }

  if (todo.done) return <></>

  return (
    <li style={{ position: 'relative', width: 550 }}>
      {!(typeof name === 'string') &&
        <>
          <span role='todo-name'>{todo.name}</span>
          <button
            onClick={() => setName(todo.name)}
            role='modify-button'
            style={{ fontSize: 20, margin: 10, position: 'absolute', right: 0, marginRight: 90 }}
          >Modify</button>
        </>
      }
      {typeof name === 'string' &&
        <>
          <input
            role='modify-input'
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{ fontSize: 20 }}
          />
          <button
            onClick={handleNameChange}
            role='modify-button'
            style={{ fontSize: 20, margin: 10, position: 'absolute', right: 0, marginRight: 90 }}
          >Submit</button>
        </>}
      <button
        role='done-button'
        onClick={handleDone}
        style={{ fontSize: 20, margin: 10, position: 'absolute', right: 0 }}
      >
        Done
      </button>
    </li>
  )
}

export default Todo
