const Board = require('../board')

describe('Board', () => {

  xit('state is stored as decoded array', () => {
    const board = new Board('x = 5, y = 4\n2bo$2ob2o$bobo$2bo!')
    expect(board.state).toEqual([
      ['.', '.', 'O', '.', '.'],
      ['O', 'O', '.', 'O', 'O'],
      ['.', 'O', '.', 'O', '.'],
      ['.', '.', 'O', '.', '.'],
    ])
  })

})