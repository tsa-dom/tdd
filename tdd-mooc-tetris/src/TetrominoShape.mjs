import { RotatingShape } from "./RotatingShape.mjs"

const rotate2 = (shape, position, positionCount) => {
  if (position === 0) {
    return new TetrominoShape(
      positionCount,
      shape.rotateRight().toString(),
      1
    )
  } else {
    return new TetrominoShape(
      positionCount,
      shape.rotateLeft().toString(),
      0
    )
  }
}

export class TetrominoShape {
  shape
  position
  positionCount

  constructor(positionCount, shape, position) {
    this.shape = new RotatingShape(shape.slice(0, -1))
    this.positionCount = positionCount
    this.position = position ? position : 0
  }

  rotateRight() {
    if (this.positionCount === 4) {
      return new TetrominoShape(
        this.positionCount,
        this.shape.rotateRight().toString()   
      )
    } else if (this.positionCount === 2) {
      return rotate2(this.shape, this.position, this.positionCount)
    } else {
      return new TetrominoShape(0, this.shape.toString())
    }
  }

  rotateLeft() {
    if (this.positionCount === 4) {
      return new TetrominoShape(
        this.positionCount,
        this.shape.rotateLeft().toString()   
      )
    } else if (this.positionCount === 2) {
      return rotate2(this.shape, this.position, this.positionCount)
    } else {
      return new TetrominoShape(0, this.shape.toString())
    }
  }

  toString() {
    return this.shape.toString()
  }
}