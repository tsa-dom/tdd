import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const stepsLeft = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveLeft()
  }
}

const stepsRight = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveRight()
  }
}

const stepsDown = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveDown()
  }
}

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6)
  })

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    )
  })

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    stepsLeft(board, 10)
    
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    stepsRight(board, 10)
    
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it("it cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    stepsDown(board, 10)
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    )
  })

  it("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.I_SHAPE.rotateLeft())
    stepsLeft(board, 3)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    stepsDown(board, 2)
    stepsLeft(board, 10)
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .I.T......
       .ITTT.....
       .I........
       .I........`
    )
  })

  it("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.I_SHAPE.rotateLeft())
    stepsRight(board, 4)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    stepsDown(board, 2)
    stepsRight(board, 10)
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......T.I.
       .....TTTI.
       ........I.
       ........I.`
    )
  })

  it("it cannot be moved down through other blocks", () => {
    board.drop(Tetromino.T_SHAPE)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    stepsDown(board, 10)
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    )
  })

})