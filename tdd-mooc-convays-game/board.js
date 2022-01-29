const { decodeRLE } = require('./encoder')

class Board {
  state

  constructor(RLE) {
    this.state = decodeRLE(RLE)
  }
}

module.exports = Board