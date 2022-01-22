import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { stepsDown, stepsLeft, stepsRight } from "./helpers.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6)
  })

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
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
      `....TTT...
       .....T....
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
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    )
  })

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    stepsLeft(board, 10)
    
    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
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
      `.......TTT
       ........T.
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
       ...TTT....
       ....T.....`
    )
  })

  it("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.I_SHAPE.rotateLeft())
    stepsLeft(board, 4)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    stepsDown(board, 2)
    stepsLeft(board, 10)
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .ITTT.....
       .I.T......
       .I........
       .I........`
    )
  })

  it("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.I_SHAPE.rotateLeft())
    stepsRight(board, 3)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    stepsDown(board, 2)
    stepsRight(board, 10)
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....TTTI.
       ......T.I.
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
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    )
  })

})