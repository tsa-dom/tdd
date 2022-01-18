export class RotatingShape {
  shape;
  size;

  constructor(shape) {
    const shapeArr = shape
      .replaceAll(" ", "")
      .split("\n")
      .map((t) => t.split(""));

    this.shape = shapeArr;
    this.size = shapeArr.length;
  }

  rotateRight() {
    let newShape = "";
    for (let i = 0; i < this.size; i++) {
      for (let j = this.size - 1; j >= 0; j--) {
        newShape += this.shape[j][i];
      }
      if (i < this.size - 1) newShape += "\n";
    }
    return new RotatingShape(newShape);
  }

  rotateLeft() {
    let newShape = "";
    for (let i = this.size - 1; i >= 0; i--) {
      for (let j = 0; j < this.size; j++) {
        newShape += this.shape[j][i];
      }
      if (i > 0) newShape += "\n";
    }
    return new RotatingShape(newShape);
  }

  toString() {
    return `${this.shape.map((c) => c.join("")).join("\n")}\n`;
  }
}
