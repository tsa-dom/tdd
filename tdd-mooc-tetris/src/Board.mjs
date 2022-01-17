export class Board {
  width;
  height;
  state
  falling

  constructor(width, height) {
    this.width = width;
    this.height = height;
    const array = new Array()
    for (let i = 0; i < height; i++) {
      array.push(new Array())
      for (let j = 0; j < width; j++) {
        array[i].push(null)
      }
    }
    this.state = array
    this.falling = null
  }

  drop(block) {
    if (!this.falling) {
      const middle = Math.round((this.width + 1) / 2) - 1
      this.state[0][middle] = block
      this.falling = block
    } else throw new Error("already falling")
  }

  tick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.state[i][j]) {
          if (
            i === this.height - 1 &&
            this.falling === this.state[i][j]
          ) {
            this.falling = null
          } else if (i < this.height - 1) {
            if (this.state[i + 1][j]) {
              this.falling = null
            } else {
              newState[i + 1][j] = this.state[i][j]
              newState[i][j] = null
            }
          }
        }
      }
    }
    this.state = newState
  }

  hasFalling() {
    return this.falling ? true : false
  }

  toString() {
    return `${this.state.map(col => col.map(row => {
      return row ? row.color : '.'
    }).join("")).join("\n")}\n`;
  }
}
