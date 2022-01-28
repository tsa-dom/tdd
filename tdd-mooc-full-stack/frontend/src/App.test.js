/* eslint-disable react/jsx-key */
import React from 'react'
import App from './App'
import ShallowRendered from 'react-shallow-renderer'
import Hello from './components/Hello'
import Todos from './components/Todos'
import { fireEvent, render } from '@testing-library/react'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

jest.mock('./components/Todos', () => ({
  __esModule: true,
  default: () => <></>
}))

let renderer
beforeEach(() => renderer = new ShallowRendered())

describe('App', () => {

  it('initial state renders todos without archived prop', () => {
    React.useState.mockImplementation(() => [undefined, null])
    renderer.render(<App />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual(
      expect.arrayContaining([
        <Hello />,
        <Todos />
      ])
    )
  })

  it('Todos are rendered with arvhived prop', () => {
    React.useState.mockImplementation(() => [true, null])
    renderer.render(<App />)
    const result = renderer.getRenderOutput()
    expect(result.props.children).toEqual(
      expect.arrayContaining([
        <Hello />,
        <Todos archived={true} />
      ])
    )
  })

  it('archived state can be changed', () => {
    const calls = []
    React.useState.mockImplementation(() => [true, (e) => calls.push(e)])
    const component = render(<App />)
    fireEvent.click(component.getByText('Archived'))
    expect(calls).toContain(true)
  })

  it('todos state can be changed', () => {
    const calls = []
    React.useState.mockImplementation(() => [true, (e) => calls.push(e)])
    const component = render(<App />)
    fireEvent.click(component.getByText('Todos'))
    expect(calls).toContain(undefined)
  })

})