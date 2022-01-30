const { sum } = require('../src/example.mjs')

describe('Example test fixture', () => {
  it('Example test', () => {
    expect(sum(1, 2)).toEqual(3)
  })
})
