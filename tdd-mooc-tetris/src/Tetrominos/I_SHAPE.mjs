const getShape = (position) => {
  switch (position) {
    case 'top':
      return '..I..\n..I..\n..I..\n..I..\n.....\n'
    default:
      return '.....\n.....\nIIII.\n.....\n.....\n'
  }
}

export class I_SHAPE {
  shape;
  position;

  constructor(position) {
    this.position = position ? position : 'left'
    this.shape = getShape(position)
  }

  rotateRight() {
    if (this.position === "top") return new I_SHAPE("left")
    else return new I_SHAPE("top")
  }

  rotateLeft() {
    if (this.position === "top") return new I_SHAPE("left")
    else return new I_SHAPE("top")
  }

  toString() {
    return this.shape
  }
}