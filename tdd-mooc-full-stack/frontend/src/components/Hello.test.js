import React from 'react'
import { render } from 'react-dom'
import App from '../App'

it('Renders "Hello world"', () => {

  const setHelloMock = jest.fn()
  const useStateMock = useState => [useState, setHelloMock]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock)

  jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
  jest.spyOn(Hello, 'setHello')
  render(<App />)

  expect(Hello.setHello).toHaveBeenCalledTimes(1)
})