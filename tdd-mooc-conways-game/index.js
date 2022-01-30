const Board = require('./board')
const { readFile } = require('./fileService')

const file = process.argv[2]
const iterations = process.argv[3]

// I don't test this because it needs mocking console.log
const getState = async () => {
  const data = await readFile(file)
  const board = new Board(data)
  board.iterate(Number(iterations))
  console.log(board.pretty())
  console.log('\nRLE:')
  console.log(board.toString())
}

getState()