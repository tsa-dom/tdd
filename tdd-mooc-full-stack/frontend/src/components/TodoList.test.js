import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import TodoList from './TodoList'

const todos = [
  { id: 1, name: 'Buy some milk', done: false },
  { id: 2, name: 'Clean room', done: false },
  { id: 3, name: 'Do your home work', done: false }
]

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: () => {}
}))

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

describe('Todo List', () => {
  it('renders todos', () => {
    React.useState.mockImplementation(() => [todos, null])
    act(() => {
      ReactDOM.render(<TodoList />, container)
    })
    const todoDiv = container.querySelector('#todo-list')
    todos.forEach(todo => {
      expect(todoDiv.textContent).toContain(todo.name)
    })
  })

  it('renders if api returns null', () => {
    React.useState.mockImplementation(() => [null, null])
    act(() => {
      ReactDOM.render(<TodoList />, container)
    })
    const todoDiv = container.querySelector('#todo-list')
    expect(todoDiv).toBeDefined()
  })

  it('renders initial state', () => {
    React.useState.mockImplementation((e) => [e, null])
    act(() => {
      ReactDOM.render(<TodoList />, container)
    })
    const todoDiv = container.querySelector('#todo-list')
    expect(todoDiv).toBeDefined()
  })
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})