import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from './App'

let container = document.createElement('div')
jest.mock('./components/TodoList', () => ({
  __esModule: true,
  default: () => <div id='todo-list'></div>
}))

describe('App', () => {
  it('renders TodoList', () => {
    act(() => {
      ReactDOM.render(<App />, container)
    })
    const todoDiv = container.querySelector('#todo-list')
    expect(todoDiv).not.toBeNull()
  })
})