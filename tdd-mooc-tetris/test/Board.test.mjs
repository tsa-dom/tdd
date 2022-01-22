import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Scoreboard } from "../src/Scoreboard.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { stepsDown, twoFullLines } from "./helpers.mjs"

describe("Board", () => {
  let rules = {
    level: 0,
    line1: n => 40 * (1 + n),
    line2: n => 100 * (1 + n),
    line3: n => 300 * (1 + n),
    line4: n => 1200 * (1 + n),
  }

  let scoreBoard
  let board
  beforeEach(() => {
    scoreBoard = new Scoreboard(rules)
    board = new Board(10, 8)
  })

  it("removed lines increases subscriber's score", () => {
    board.notifier.subscribe(scoreBoard)
    board.setState(twoFullLines)
    board.drop(Tetromino.I_SHAPE.rotateRight())
    board.moveLeft()
    board.moveLeft()
    stepsDown(board, 10)

    expect(scoreBoard.getScore()).to.equal(100)
  })
})