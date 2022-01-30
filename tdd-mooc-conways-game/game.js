const { checkCell } = require('./rules')


const iterate = (array) => {
  const result = JSON.parse(JSON.stringify(array))
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (checkCell(array, j, i)) {
        result[i][j] = 'O'
      } else {
        result[i][j] = '.'
      }
    }
  }

  return result
}

module.exports = { iterate }