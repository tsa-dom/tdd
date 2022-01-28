import React from 'react'

const ArchiveList = ({ todos }) => {

  return (
    <div id="todo-container">
      <h1>Archived</h1>
      {todos.filter(t => t.done).map(t => <li key={t.id}>{t.name}</li>)}
    </div>
  )
}

export default ArchiveList
