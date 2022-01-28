/* eslint-disable react/jsx-key */
import React from 'react'
import Todos from './Todos'
import todoSvc from '../services/todos'
import ShallowRenderer from 'react-shallow-renderer'
import TodoList from './TodoList'
import { render, fireEvent } from '@testing-library/react'
import ArchiveList from './ArchiveList'

const apiResponse = [
  { id: 1, name: 'Buy some milk', done: false },
  { id: 2, name: 'Clean room', done: false },
  { id: 3, name: 'Do your home work', done: false }
]

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn()
}))

jest.mock('./TodoList', () => ({
  __esModule: true,
  default: ({ todos }) => <div id='todo-list'>
    {Array.isArray(todos) && todos.map(todo => <span key={todo.id}>{todo.name}</span>)}
  </div>
}))

jest.mock('../services/todos', () => ({
  createTodo: jest.fn()
}))

let renderer
beforeEach(() => renderer = new ShallowRenderer())

describe('Todos', () => {

  it('renders TodoList', () => {
    React.useState.mockImplementation(() => [[], null])
    renderer.render(<Todos />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual(
      expect.arrayContaining([
        <TodoList todos={[]} setTodos={null} />
      ])
    )
  })

  it('TodoList receives todos fetched from the api', () => {
    const todos = []
    const setTodos = () => todos.push(...apiResponse)
    React.useState.mockImplementation(() => [todos, setTodos])
    React.useEffect.mockImplementation(setTodos)
    renderer.render(<Todos />)
    const result = renderer.getRenderOutput()
    expect(result.props.children.map(p => ({ ...p, props: { todos: p.props.todos } }))).toEqual(
      expect.arrayContaining([
        <TodoList todos={todos} />
      ])
    )
  })

  it('a new todo is added when the submit button is pressed', async () => {
    const calls = []
    React.useState.mockImplementation((e) => [e, e => calls.push(e)])
    todoSvc.createTodo.mockImplementation(() => ({ id: 1, name: 'todo', done: false }))
    const component = render(<Todos />)
    fireEvent.click(component.getByText('Create todo'))
    await new Promise(c => setTimeout(c, 1000))
    expect(calls).toEqual(
      expect.arrayContaining([[{ id: 1, name: 'todo', done: false }]])
    )
  })

  it('renders ArchivedTodos if archived prop is given', () => {
    React.useState.mockImplementation(() => [apiResponse, null])
    const renderer = new ShallowRenderer()
    renderer.render(<Todos archived/>)
    const result = renderer.getRenderOutput()
    expect(result).toEqual(<ArchiveList todos={apiResponse} />)
  })
})