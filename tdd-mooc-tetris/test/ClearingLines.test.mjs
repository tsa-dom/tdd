import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import {
  fullLineBottom,
  fullLineMiddle,
  fullLineTop,
  twoFullLines,
} from "./helpers.mjs";

const stepsDown = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveDown();
  }
};

describe("Clearing lines", () => {
  let board;
  let longBoard;
  beforeEach(() => {
    board = new Board(10, 6);
    longBoard = new Board(10, 8);
  });

  it("a full line in the bottom is removed", () => {
    board.setState(fullLineBottom);
    board.drop(Tetromino.T_SHAPE.rotateRight());
    board.moveRight();
    stepsDown(board, 10);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .ZOO.T..L.
       ZZOOTTOOL.`
    );
  });

  it("a full line in the top is removed", () => {
    board.setState(fullLineTop);
    board.drop(Tetromino.I_SHAPE);
    board.moveRight();
    stepsDown(board, 10);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT...L
       ....T....L`
    );
  });

  it("a full line in the middle is removed", () => {
    board.setState(fullLineMiddle);
    board.drop(Tetromino.S_SHAPE);
    board.moveRight();
    stepsDown(board, 10);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .Z...SSZZ.
       Z.OO..OO..`
    );
  });

  it("two full lines are removed", () => {
    longBoard.setState(twoFullLines);
    longBoard.drop(Tetromino.I_SHAPE.rotateRight());
    longBoard.moveLeft();
    longBoard.moveLeft();
    stepsDown(longBoard, 10);

    expect(longBoard.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       J..IOO....
       .T.ILLLZZL`
    );
  });
});
