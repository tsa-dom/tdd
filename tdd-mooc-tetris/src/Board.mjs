import { Block } from "./Block.mjs";
import { TetrominoShape } from "./TetrominoShape.mjs";

export class Board {
  width;
  height;
  state;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    const array = new Array();
    for (let i = 0; i < height; i++) {
      array.push(new Array());
      for (let j = 0; j < width; j++) {
        array[i].push(null);
      }
    }
    this.state = array;
    this.falling = null;
  }

  drop(block) {
    if (block instanceof TetrominoShape) {
      const shape = block.shape.shape
      const height = shape.length
      const width = shape[0].length
      const start = Math.round((this.width + 1) / 2) - (width + 3) / 2;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          this.state[i][start + j] = shape[i][j] === '.' ? null : new Block(shape[i][j])
        }
      }
    }
    else if (!this.falling) {
      const middle = Math.round((this.width + 1) / 2) - 1;
      this.state[0][middle] = block;
      this.falling = true;
    } else throw new Error("already falling");
  }

  tick() {
    const oldState = JSON.parse(JSON.stringify(this.state))
      .map(c => c.map(b => b ? new Block(b.color, false) : null))
      
    const width = this.width - 1
    const height = this.height - 1
    for (let i = height; i >= 0; i--) {
      for (let j = width; j >= 0; j--) {
        const block = this.state[i][j]
        if (block && block.falling) {
          if (i === height) {
            block.stop()
            this.falling = false
          } else if (i < height) {
            if (this.state[i + 1][j]) {
              block.stop()
              this.state = oldState
              this.falling = false
            } else {
              this.state[i + 1][j] = block;
              this.state[i][j] = null;
            }
          }
        }
      }
    }
  }

  hasFalling() {
    return this.falling;
  }

  moveLeft() {
    const oldState = JSON.parse(JSON.stringify(this.state))
    const width = this.width - 1
    const height = this.height - 1

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const block = this.state[i][j]
        if (block && block.falling) {
          if (j > 0 && !this.state[i][j - 1]) {
            this.state[i][j - 1] = block
            this.state[i][j] = null
          } else {
            this.state = oldState
            break
          }
        }
      }
    }
  }

  moveRight() {
    const oldState = JSON.parse(JSON.stringify(this.state))
    const width = this.width - 1
    const height = this.height - 1

    for (let i = 0; i < height; i++) {
      for (let j = width; j >= 0; j--) {
        const block = this.state[i][j]
        if (block && block.falling) {
          if (j < width && !this.state[i][j + 1]) {
            this.state[i][j + 1] = block
            this.state[i][j] = null
          } else {
            this.state = oldState
            break
          }
        }
      }
    }
  }

  moveDown() {
    this.tick()
  }

  toString() {
    return `${this.state
      .map((col) =>
        col
          .map((row) => {
            return row ? row.color : ".";
          })
          .join("")
      )
      .join("\n")}\n`;
  }
}
