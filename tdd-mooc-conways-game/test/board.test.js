const Board = require('../board')

describe('Board', () => {

  it('state is stored as decoded array', () => {
    const board = new Board('x = 5, y = 8\n$$2bo$2ob2o$bobo$2bo$$!')
    expect(board.state).toEqual([
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', 'O', '.', '.'],
      ['O', 'O', '.', 'O', 'O'],
      ['.', 'O', '.', 'O', '.'],
      ['.', '.', 'O', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
    ])
  })

  it('iterates a new state properly', () => {
    const board = new Board('x = 5, y = 8\n$$2bo$2ob2o$bobo$2bo$$!')
    board.iterate(1)
    expect(board.state).toEqual([
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', 'O', 'O', 'O', '.'],
      ['O', 'O', '.', 'O', 'O'],
      ['O', 'O', '.', 'O', 'O'],
      ['.', '.', 'O', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
    ])
  })

  it('iterates correct result after 10 iterations', () => {
    const board = new Board('x = 5, y = 8\n$$2bo$2ob2o$bobo$2bo$$!')
    board.iterate(10)
    expect(board.state).toEqual([
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', 'O', 'O', 'O', '.'],
      ['.', '.', '.', '.', '.'],
    ])
  })

  it('toString returns encoded RLE', () => {
    const board = new Board('x = 5, y = 8\n$$2bo$2ob2o$bobo$2bo$$!')
    expect(board.toString()).toEqual('x = 5, y = 8\n$$2bo$2ob2o$bobo$2bo$$!')
  })

  it('prints pretty version of the array', () => {
    const board = new Board('x = 5, y = 8\n$$2bo$2ob2o$bobo$2bo$$!')
    expect(board.pretty()).toEqual(`. . . . .
. . . . .
. . O . .
O O . O O
. O . O .
. . O . .
. . . . .
. . . . .`)
  })

})