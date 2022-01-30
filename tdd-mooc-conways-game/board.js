const { decodeRLE, encodeRLE } = require('./encoder')
const { iterate } = require('./game')

class Board {
  state

  constructor(RLE) {
    this.state = decodeRLE(RLE)
  }

  iterate(amount) {
    for (let i = 0; i < amount; i++) {
      this.state = iterate(this.state)
    }
  }

  pretty() {
    return this.state.map(t => t.join(' ')).join('\n')
  }

  toString() {
    return encodeRLE(this.state)
  }
}

module.exports = Board