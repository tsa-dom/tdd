import { Block } from "./Block.mjs"

export const embedTetramino = (board, block) => {
  let shape = block.toArray()
  let { x, y, length } = board.falling
  let width = board.width
  let state = JSON.parse(JSON.stringify(board.state))
  
  // This functionality is for wall kick
  if (x < 0) {
    for (let i = x; i < 0; i++) {
      if (!board.moveRight()) return
    }
    x = 0
  }
  if (x + length > width) {
    for (let i = x; i > width - length; i--) {
      if (!board.moveLeft()) return
    }
    x = width - length
  }
  
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (board.state[y + i][x + j]?.falling) {
        board.state[y + i][x + j] = null
      }
    }
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (shape[i][j] !== '.') {
        if (board.state[y + i][x + j]) {
          board.state = state
          return
        }
        board.state[y + i][x + j] = new Block(shape[i][j])
      }
    }
  }
  board.falling.block = block
}

export const removeFullLines = (board) => {
  const fullLines = []
  for (let i = 0; i < board.length; i++) {
    let isFull = true
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === null) isFull = false
    }
    if (isFull) fullLines.push(i)
  }
  for (let i of fullLines) {
    board.splice(i, 1)
    board.unshift(new Array(board[0].length).fill(null))
  }
  return fullLines.length
}