const Board = require('./board')
const { readFile } = require('./fileService')

const run = async () => {
  const RLE = await readFile('angel.rle')
  const board = new Board(RLE)
  board.iterate(3)
  console.log(board.pretty())
  console.log('\nRLE:')
  console.log(board.toString())
}

run()