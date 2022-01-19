export class O_SHAPE {
  shape;

  constructor() {
    this.shape = '.OO\n.OO\n...\n'
  }

  rotateRight() {
    return new O_SHAPE()
  }

  rotateLeft() {
    return new O_SHAPE()
  }

  toString() {
    return this.shape
  }
}