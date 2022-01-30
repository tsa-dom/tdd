const { iterate } = require('../game')

describe('Game', () => {

  it('iteration generates a new state when edges contains dead cells', () => {
    const array = [
      ['.', '.', '.', '.', '.'],
      ['.', '.', 'O', '.', '.'],
      ['.', '.', '.', 'O', '.'],
      ['.', 'O', 'O', 'O', '.'],
      ['.', '.', '.', '.', '.'],
    ]
    expect(iterate(array)).toEqual([
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', 'O', '.', 'O', '.'],
      ['.', '.', 'O', 'O', '.'],
      ['.', '.', 'O', '.', '.'],
    ])
  })

  it('bottom overflowed living cells don\'t appear to the array', () => {
    const array = [
      ['.', 'O', '.'],
      ['.', '.', 'O'],
      ['O', 'O', 'O'],
    ]
    expect(iterate(array)).toEqual([
      ['.', '.', '.'],
      ['O', '.', 'O'],
      ['.', 'O', 'O'],
    ])
  })

  it('right overflowed living cells don\'t appear to the array', () => {
    const array = [
      ['.', '.', 'O'],
      ['O', '.', 'O'],
      ['.', 'O', 'O'],
    ]
    expect(iterate(array)).toEqual([
      ['.', 'O', '.'],
      ['.', '.', 'O'],
      ['.', 'O', 'O'],
    ])
  })

  it('top overflowed living cells don\'t appear to the array', () => {
    const array = [
      ['.', 'O', '.'],
      ['O', '.', '.'],
      ['O', 'O', 'O'],
    ]
    expect(iterate(array)).toEqual([
      ['.', '.', '.'],
      ['O', '.', 'O'],
      ['O', 'O', '.'],
    ])
  })

  it('left overflowed living cells don\'t appear to the array', () => {
    const array = [
      ['O', '.', '.'],
      ['O', '.', 'O'],
      ['O', 'O', '.'],
    ]
    expect(iterate(array)).toEqual([
      ['.', 'O', '.'],
      ['O', '.', '.'],
      ['O', 'O', '.'],
    ])
  })

})