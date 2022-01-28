import React, { useState } from 'react'
import Hello from './components/Hello'
import Todos from './components/Todos'
import './App.css'

const App = () => {
  const [showArchived, setShowArchived] = useState(undefined)

  const archivePage = () => {
    setShowArchived(true)
  }

  const todoPage = () => {
    setShowArchived(undefined)
  }

  return (
    <>
      <Hello />
      <div style={{ fontSize: 30, padding: 30, paddingBottom: 0, color: 'blue' }}>
        <a style={{ marginRight: 30, cursor: 'pointer' }} onClick={todoPage}>Todos</a>
        <a style={{ cursor: 'pointer' }} onClick={archivePage}>Archived</a>
      </div>
      <Todos archived={showArchived} />
    </>
  )
}

export default App
