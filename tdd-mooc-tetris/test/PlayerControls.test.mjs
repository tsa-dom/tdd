import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";
import { stepsDown, stepsLeft, stepsRight } from "./helpers.mjs";

describe("Player controls", () => {
  let board;
  let longBoard
  beforeEach(() => {
    board = new Board(10, 6)
    longBoard = new Board(10, 8)
  })

  it("a falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    )
  })

  it("a falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    )
  })

  it("a falling tetromino rotation don't change unfalling tetromino's position", () => {
    board.drop(Tetromino.I_SHAPE.rotateLeft())
    stepsLeft(board, 2)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ...IT.....
       ...I......
       ...I......
       ...I......`
    )
  })

  it("a falling tetromino cannot be rotated left if there is no room to rotate", () => {
    board.drop(Tetromino.I_SHAPE.rotateLeft())
    stepsLeft(board, 2)
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    board.moveDown()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...ITT....
       ...IT.....
       ...I......
       ...I......`
    )
  })

  it("a falling tetromino cannot be rotated right if there is no room to rotate", () => {
    board.drop(Tetromino.I_SHAPE.rotateRight())
    stepsDown(board, 10)
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveDown()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTI....
       ....TI....
       .....I....
       .....I....`
    )
  })

  xit("wall kick at the left side of the board works if there is a possible position available", () => {
    board.drop(Tetromino.T_SHAPE.rotateLeft())
    stepsLeft(board, 10)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       .T........
       TTT.......
       ..........
       ..........
       ..........`
    )
  })

  xit("wall kick at the right side of the board works if there is a possible position available", () => {
    board.drop(Tetromino.T_SHAPE.rotateRight())
    stepsRight(board, 10)
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       .......T..
       ......TTT.
       ..........
       ..........
       ..........`
    )
  })

  describe("wall kick at the left side of the board fails", () => {
    
    it("if the tetramino cannot be moved right", () => {
      board.drop(Tetromino.T_SHAPE.rotateLeft())
      stepsLeft(board, 2)
      stepsDown(board, 10)
      board.drop(Tetromino.T_SHAPE.rotateLeft())
      stepsLeft(board, 10)
      stepsDown(board, 3)
      board.rotateRight()
      
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         T.........
         TTT.......
         T.TT......
         ..T.......`
      )
    })

    it("if there is not a possible position available", () => {
      longBoard.drop(Tetromino.I_SHAPE.rotateRight())
      stepsLeft(longBoard, 2)
      stepsDown(longBoard, 10)
      longBoard.drop(Tetromino.I_SHAPE)
      longBoard.rotateRight()
      stepsLeft(longBoard, 10)
      stepsDown(longBoard, 3)
      longBoard.rotateLeft()
 
      expect(longBoard.toString()).to.equalShape(
        `..........
         ..........
         ..........
         I.........
         I..I......
         I..I......
         I..I......
         ...I......`
      )
    })

  })

  describe("wall kick at the right side of the board fails ", () => {

    it("if the tetramino cannot be moved left", () => {
      board.drop(Tetromino.T_SHAPE.rotateRight())
      stepsRight(board, 3)
      stepsDown(board, 10)
      board.drop(Tetromino.T_SHAPE.rotateRight())
      stepsRight(board, 10)
      stepsDown(board, 3)
      board.rotateLeft()
  
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         .........T
         .......TTT
         ......TT.T
         .......T..`
      )
    })

    it("if there is not a possible position available", () => {
      longBoard.drop(Tetromino.I_SHAPE.rotateRight())
      stepsRight(longBoard, 1)
      stepsDown(longBoard, 10)
      longBoard.drop(Tetromino.I_SHAPE)
      longBoard.rotateRight()
      stepsRight(longBoard, 10)
      stepsDown(longBoard, 3)
      longBoard.rotateLeft()
      
      expect(longBoard.toString()).to.equalShape(
        `..........
         ..........
         ..........
         .........I
         ......I..I
         ......I..I
         ......I..I
         ......I...`
      )
    })

  })
  
})