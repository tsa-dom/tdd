/* eslint-disable react/jsx-key */
import React from 'react'
import TodoList from './TodoList'
import Todo from './Todo'
import ShallowRenderer from 'react-shallow-renderer'
import { render } from '@testing-library/react'

const todos = [
  { id: 1, name: 'Buy some milk', done: false },
  { id: 2, name: 'Clean room', done: false },
  { id: 3, name: 'Do your homework', done: false }
]

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn()
}))

jest.mock('../services/todos', () => ({
  modifyTodo: jest.fn()
}))

let renderer
beforeEach(() => renderer = new ShallowRenderer())

describe('Todos List', () => {

  it('renders todos', () => {
    renderer.render(<TodoList todos={todos} />)
    const result = renderer.getRenderOutput()
    expect(result.props.children.map(p => ({ ...p, props: { todo: p.props.todo } }))).toEqual(
      expect.arrayContaining([
        <Todo key={1} todo={{ id: 1, name: 'Buy some milk', done: false }} />,
        <Todo key={2} todo={{ id: 2, name: 'Clean room', done: false }} />,
        <Todo key={3} todo={{ id: 3, name: 'Do your homework', done: false }} />
      ])
    )
  })

  it('renders if todos are undefined', () => {
    renderer.render(<TodoList />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual([])
  })

  it('renders modify todo buttons', () => {
    React.useState.mockImplementation(() => ['', jest.fn()])
    const component = render(<TodoList todos={todos} />)
    const modifyButtons = component.getAllByRole('modify-button')
    expect(modifyButtons.length).toEqual(3)
  })

})