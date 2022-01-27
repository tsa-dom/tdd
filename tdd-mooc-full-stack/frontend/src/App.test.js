/* eslint-disable react/jsx-key */
import React from 'react'
import App from './App'
import ShallowRendered from 'react-shallow-renderer'
import Hello from './components/Hello'
import Todos from './components/Todos'

describe('App', () => {

  it('renders children', () => {
    const renderer = new ShallowRendered()
    renderer.render(<App />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual([
      <Hello />,
      <Todos />
    ])
  })
})