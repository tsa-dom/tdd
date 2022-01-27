/* eslint-disable react/jsx-key */
import React from 'react'
import TodoList from './TodoList'
import ShallowRenderer from 'react-shallow-renderer'

let container

const todos = [
  { id: 1, name: 'Buy some milk', done: false },
  { id: 2, name: 'Clean room', done: false },
  { id: 3, name: 'Do your home work', done: false }
]

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

let renderer
beforeEach(() => renderer = new ShallowRenderer())

describe('Todos List', () => {

  it('renders todos', () => {
    renderer.render(<TodoList todos={todos} />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual([
      <li key={1}>Buy some milk</li>,
      <li key={2}>Clean room</li>,
      <li key={3}>Do your home work</li>
    ])
  })

  it('renders if todos are undefined', () => {
    renderer.render(<TodoList />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual([])
  })

})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})