const checkCell = (array, x, y) => {
  const yMin = y > 0 ? y - 1 : y
  const yMax = y < array.length - 1 ? y + 1 : y
  let livingCells = 0
  const isLiving = array[y][x] === 'O' ? true : false
  for (let i = yMin; i <= yMax; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (array[i][j] === 'O' && !(i === y && j === x)) {
        livingCells++
      }
    }
  }
  if (livingCells === 3) return true
  if (livingCells === 2 && isLiving) return true
  return false
}

module.exports = { checkCell }