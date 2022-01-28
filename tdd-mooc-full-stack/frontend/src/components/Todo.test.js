import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Todo from './Todo'

const todo = { id: 1, name: 'Buy some milk', done: false }
const done = { id: 1, name: 'Buy some milk', done: true }

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn()
}))

jest.mock('../services/todos', () => ({
  modifyTodo: jest.fn()
}))

describe('Todo', () => {

  it('an input field is not rendered if the input state value is null', () => {
    React.useState.mockImplementation(() => [null, null])
    const component = render(<Todo todo={todo} />)
    let errors = 0
    try {
      component.getAllByRole('modify-input')
    } catch (err) {
      errors++
    }
    expect(errors).toEqual(1)
  })

  it('an input field is rendered if the input state value is string', () => {
    React.useState.mockImplementation(() => ['Buy some milk', null])
    const component = render(<Todo todo={todo} />)
    expect(component.getAllByRole('modify-input')[0].value).toEqual('Buy some milk')
  })

  it('an input field is rendered if the input state value is empty string', () => {
    React.useState.mockImplementation(() => ['', null])
    const component = render(<Todo todo={todo} updateTodo={jest.fn()} />)
    expect(component.getAllByRole('modify-input')[0].value).toEqual('')
  })

  it('a todo name label is not rendered if an input field is open', () => {
    React.useState.mockImplementation(() => ['Buy some milk', jest.fn()])
    const component = render(<Todo todo={todo} />)
    component.getAllByRole('modify-button')[0].click()
    let errors = 0
    try {
      component.getAllByRole('todo-name')
    } catch (err) {
      errors++
    }
    expect(errors).toEqual(1)
  })

  it('an input value can be changed', () => {
    const calls = []
    React.useState.mockImplementation(() => ['', (e) => calls.push(e)])
    const component = render(<Todo todo={todo} />)
    fireEvent.change(component.getAllByRole('modify-input')[0], { target: { value: 'Buy some milk' } })
    expect(calls).toContain('Buy some milk')
  })

  it('modify button changes it name to "Submit" after click', () => {
    React.useState.mockImplementation(() => ['Buy some milk', () => {}])
    const component = render(<Todo todo={todo} />)
    expect(component.getAllByRole('modify-button')[0].innerHTML).toEqual('Submit')
  })

  it('renders mark as done button', () => {
    React.useState.mockImplementation(() => [null, () => {}])
    const component = render(<Todo todo={todo} />)
    const doneButton = component.getAllByRole('done-button')[0]
    expect(doneButton.innerHTML).toEqual('Done')
  })

  it('todo is not rendered if it\'s done', () => {
    React.useState.mockImplementation(() => [null, () => {}])
    const component = render(<Todo todo={done} />)
    let errors = 0
    try {
      component.getByText('Buy some milk')
    } catch (err) {
      errors++
    }
    expect(errors).toEqual(1)
  })

})