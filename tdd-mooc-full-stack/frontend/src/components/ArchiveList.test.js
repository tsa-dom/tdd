/* eslint-disable react/jsx-key */
import ShallowRenderer from 'react-shallow-renderer'
import React from 'react'
import ArchiveList from './ArchiveList'

const todos = [
  { id: 1, name: 'Buy some milk', done: true },
  { id: 2, name: 'Clean room', done: false },
  { id: 3, name: 'Do your home work', done: true },
  { id: 4, name: 'Go shop', done: true }
]

let renderer
beforeEach(() => renderer = new ShallowRenderer())

describe('Archive List', () => {

  it('renders completed todos', () => {
    renderer.render(<ArchiveList todos={todos} />)
    const result = renderer.getRenderOutput()
    expect(result.props.children[1]).toEqual([
      <li key={1}>Buy some milk</li>,
      <li key={3}>Do your home work</li>,
      <li key={4}>Go shop</li>
    ])
  })

})