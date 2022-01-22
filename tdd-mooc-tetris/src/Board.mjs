import { Block } from "./Block.mjs";
import { RotatingShape } from "./RotatingShape.mjs";

const embedTetramino = (board, block) => {
  let shape = block.toArray()
  let { x, y, lenght } = board.falling
  let width = board.width
  let state = JSON.parse(JSON.stringify(board.state))
  
  // This functionality is for wall kick
  if (x < 0) {
    for (let i = x; i < 0; i++) {
      if (!board.moveRight()) return
    }
    x = 0
  }
  if (x + lenght > width) {
    for (let i = x; i > width - lenght; i--) {
      if (!board.moveLeft()) return
    }
    x = width - lenght
  }
  
  for (let i = 0; i < lenght; i++) {
    for (let j = 0; j < lenght; j++) {
      if (board.state[y + i][x + j]?.falling) {
        board.state[y + i][x + j] = null
      }
    }
  }
  for (let i = 0; i < lenght; i++) {
    for (let j = 0; j < lenght; j++) {
      if (shape[i][j] !== '.') {
        if (board.state[y + i][x + j]) {
          board.state = state
          return
        }
        board.state[y + i][x + j] = new Block(shape[i][j])
      }
    }
  }
  board.falling.block = block
}

export class Board {
  width;
  height;
  state;
  falling;

  constructor(width, height) {
    this.width = width
    this.height = height

    const array = []
      for (let i = 0; i <= height; i++) {
        array.push([]);
        for (let j = 0; j < width; j++) {
          array[i].push(null);
        }
      }
    this.state = array;
  }

  drop(block) {
    if (block instanceof RotatingShape) {
      const start = Math.round((this.width - 5) / 2);
      this.falling = { x: start, y: 0, lenght: 4, block, direction: 'top' }
      embedTetramino(this, this.falling.block)
    }
    else if (!this.falling) {
      const middle = Math.round((this.width + 1) / 2) - 1;
      this.state[1][middle] = block;
      this.falling = true;
    } else throw new Error("already falling");
  }

  rotateLeft() {
    if (this.falling.y === 0) {
      this.moveDown()
    }
    embedTetramino(this, this.falling.block.rotateLeft())
  }

  rotateRight() {
    if (this.falling.y === 0) {
      this.moveDown()
    }
    embedTetramino(this, this.falling.block.rotateRight())
  }

  tick() {
    const oldState = JSON.parse(JSON.stringify(this.state))
      .map(c => c.map(b => b ? new Block(b.color, false) : null))
      
    const width = this.width - 1
    const height = this.height
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

  // Returns true if success, otherwise false
  moveLeft() {
    const oldState = JSON.parse(JSON.stringify(this.state))
    const width = this.width - 1
    const height = this.height - 1
    this.falling.x -= 1

    for (let i = 0; i <= height; i++) {
      for (let j = 0; j <= width; j++) {
        const block = this.state[i][j]
        if (block && block.falling) {
          if (j > 0 && !this.state[i][j - 1]) {
            this.state[i][j - 1] = block
            this.state[i][j] = null
          } else {
            this.state = oldState
            this.falling.x += 1
            return false
          }
        }
      }
    }
    return true
  }

  // Returns true if success, otherwise false
  moveRight() {
    const oldState = JSON.parse(JSON.stringify(this.state))
    const width = this.width - 1
    const height = this.height - 1
    this.falling.x += 1
    
    for (let i = 0; i < height; i++) {
      for (let j = width; j >= 0; j--) {
        const block = this.state[i][j]
        if (block && block.falling) {
          if (j < width && !this.state[i][j + 1]) {
            this.state[i][j + 1] = block
            this.state[i][j] = null
          } else {
            this.state = oldState
            this.falling.x -= 1
            return false
          }
        }
      }
    }
    return true
  }

  moveDown() {
    this.falling ? this.falling.y += 1 : undefined
    this.tick()
  }

  toString() {
    return `${this.state
      .filter((c, i) => i !== 0)
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
