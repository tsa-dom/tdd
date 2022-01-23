export class Block {
  color;
  falling;

  constructor(color, falling) {
    this.color = color;
    this.falling = falling === undefined ? true : falling;
  }

  stop() {
    this.falling = false;
  }
}
