const decodeRLE = (RLE) => {
  const data = RLE.split('!')[0].split('\n')
    .filter(t => t[0] !== '#')
  const config = data[0]
  const x = Number(config.split(', ')[0].split(' = ')[1])
  const y = Number(config.split(', ')[1].split(' = ')[1])
  const result = [[]]
  const board = data.filter((t, i) => i !== 0).join('')
  let count = NaN
  for (let i of board) {
    if (i === '$') {
      for (let j = result[result.length - 1].length; j < x; j++) {
        result[result.length - 1].push('.')
      }
      if (result.length < y) {
        result.push([])
        count = NaN
      }
    } else if (isNaN(Number(i))) {
      if (!count) count = 1
      count = Number(count)
      for (let j = 0; j < count; j++) {
        if (result[result.length - 1].length < x) {
          result[result.length - 1].push(i === 'o' ? 'O' : '.')
        }
      }
      count = NaN
    } else {
      if (isNaN(count)) count = i
      else count += i
    }
  }
  for (let j = result[result.length - 1].length; j < x; j++) {
    result[result.length - 1].push('.')
  }
  for (let i = result.length; i < y; i++) {
    result.push([])
    for (let j = 0; j < x; j++) {
      result[i].push('.')
    }
  }

  return result
}

const encodeRLE = (array) => {
  let result = `x = ${array[0].length}, y = ${array.length}\n`
  const parsedArray = [...array]
  for (let i = 0; i < array.length; i++) {
    for (let j = array[i].length - 1; j >= 0; j--) {
      if (parsedArray[i][j] === '.') parsedArray[i].splice(-1)
      else break
    }
  }
  let characters = ''
  for (let i = 0; i < parsedArray.length; i++) {
    let current
    let count = 0
    for (let j = 0; j < parsedArray[i].length; j++) {
      const value = parsedArray[i][j]
      if (current === value) count++
      else {
        if (current) {
          characters += `${count === 1 ? '' : count}${current === 'O' ? 'o' : 'b'}`
        }
        count = 1
        current = value
      }
    }
    if (current) {
      characters += `${count === 1 ? '' : count}${current === 'O' ? 'o' : 'b'}`
    }
    if (i < parsedArray.length - 1) characters += '$'
  }
  characters += '!'
  let count = 0
  for (let char of characters) {
    count++
    result += char
    if (count >= 70) {
      result += '\n'
      count = 0
    }
  }

  return result
}

module.exports = { decodeRLE, encodeRLE }