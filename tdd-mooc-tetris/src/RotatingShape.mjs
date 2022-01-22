export class RotatingShape {
  direction;
  shape;

  constructor(shape, direction) {
    this.direction = direction ? direction : 'top'
    this.shape = shape
  }

  rotateRight() {
    switch (this.direction) {
      case 'right':
        return new RotatingShape(this.shape, 'bottom')
      case 'bottom':
        return new RotatingShape(this.shape, 'left')
      case 'left':
        return new RotatingShape(this.shape, 'top')
      default:
        return new RotatingShape(this.shape, 'right')
    }
  }

  rotateLeft() {
    switch (this.direction) {
      case 'left':
        return new RotatingShape(this.shape, 'bottom')
      case 'bottom':
        return new RotatingShape(this.shape, 'right')
      case 'right':
        return new RotatingShape(this.shape, 'top')
      default:
        return new RotatingShape(this.shape, 'left')
    }
  }

  toArray() {
    return this.shape[this.direction].replaceAll(" ", "")
      .split("\n")
      .map((t) => t.split(""));
  }

  toString() {
    return `${this.shape[this.direction]}\n`;
  }
}
