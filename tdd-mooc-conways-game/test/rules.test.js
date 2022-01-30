const { checkCell } = require('../rules')

describe('Rules', () => {

  it('a dead cell with 3 neighbours becomes a living cell', () => {
    const array = [
      ['.', 'O', '.'],
      ['O', '.', '.'],
      ['.', '.', 'O']
    ]
    const isLive = checkCell(array, 1, 1)
    expect(isLive).toEqual(true)
  })

  it('a living cell with 3 neighbours stays alive', () => {
    const array = [
      ['.', 'O', '.'],
      ['O', 'O', '.'],
      ['.', '.', 'O']
    ]
    const isLive = checkCell(array, 1, 1)
    expect(isLive).toEqual(true)
  })

  it('a living cell with more than 3 neighbours becomes a dead cell', () => {
    const array = [
      ['.', 'O', '.'],
      ['O', 'O', '.'],
      ['.', 'O', 'O']
    ]
    const isLive = checkCell(array, 1, 1)
    expect(isLive).toEqual(false)
  })

  it('a living cell with 2 neigbours stays alive', () => {
    const array = [
      ['.', '.', '.'],
      ['O', 'O', '.'],
      ['.', '.', 'O']
    ]
    const isLive = checkCell(array, 1, 1)
    expect(isLive).toEqual(true)
  })

  it('a dead cell with 2 neigbours stays dead', () => {
    const array = [
      ['.', '.', '.'],
      ['O', '.', '.'],
      ['.', '.', 'O']
    ]
    const isLive = checkCell(array, 1, 1)
    expect(isLive).toEqual(false)
  })

  it('a living cell with fewer than 2 neighbours becomes dead', () => {
    const array = [
      ['.', '.', '.'],
      ['.', 'O', '.'],
      ['.', '.', 'O']
    ]
    const isLive = checkCell(array, 1, 1)
    expect(isLive).toEqual(false)
  })

  it('cells outsise the top line are considered as dead', () => {
    const array = [
      ['.', 'O', '.'],
      ['.', 'O', 'O'],
      ['.', '.', '.']
    ]
    const isLive = checkCell(array, 1, 0)
    expect(isLive).toEqual(true)
  })

  it('cells outsise the bottom line are considered as dead', () => {
    const array = [
      ['.', '.', '.'],
      ['O', 'O', '.'],
      ['.', 'O', '.']
    ]
    const isLive = checkCell(array, 1, 2)
    expect(isLive).toEqual(true)
  })

  it('cells outsise the left line are considered as dead', () => {
    const array = [
      ['.', 'O', '.'],
      ['O', 'O', '.'],
      ['.', '.', '.']
    ]
    const isLive = checkCell(array, 0, 1)
    expect(isLive).toEqual(true)
  })

  it('cells outsise the right line are considered as dead', () => {
    const array = [
      ['.', '.', '.'],
      ['.', 'O', 'O'],
      ['.', 'O', '.']
    ]
    const isLive = checkCell(array, 2, 1)
    expect(isLive).toEqual(true)
  })

})