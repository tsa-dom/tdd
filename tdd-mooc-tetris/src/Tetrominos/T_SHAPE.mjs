const getShape = (position) => {
  switch (position) {
    case "right":
      return '.T.\n.TT\n.T.\n'
    case "left":
      return '.T.\nTT.\n.T.\n'
    case "bottom":
      return '...\nTTT\n.T.\n'
    default:
      return '.T.\nTTT\n...\n'
  }
}

export class T_SHAPE {
  shape;
  position;

  constructor(position) {
    this.position = position ? position : 'top'
    this.shape = getShape(position)
  }

  rotateRight() {
    switch (this.position) {
      case "top": return new T_SHAPE("right")
      case "right": return new T_SHAPE("bottom")
      case "bottom": return new T_SHAPE("left")
      case "left": return new T_SHAPE("top")
    }
  }

  rotateLeft() {
    switch (this.position) {
      case "top": return new T_SHAPE("left")
      case "left": return new T_SHAPE("bottom")
      case "bottom": return new T_SHAPE("right")
      case "right": return new T_SHAPE("top")
    }
  }

  toString() {
    return this.shape
  }
}