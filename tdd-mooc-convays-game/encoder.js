const decodeRLE = (RLE) => {
  const data = RLE.split('!')[0].split('\n')
  const config = data[0]
  const x = Number(config.split(', ')[0].split(' = ')[1])
  const y = Number(config.split(', ')[1].split(' = ')[1])
  const result = [[]]
  let count = NaN
  for (let i of data[1]) {
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
      for (let j = 0; j < count; j++) {
        if (result[result.length - 1].length < x) {
          result[result.length - 1].push(i === 'o' ? 'O' : '.')
        }
      }
      count = NaN
    } else {
      count = Number(i)
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
  const parsedArray = [...array]
  let x = 0
  for (let i = array.length - 1; i >= 0; i--) {
    for (let j = array[i].length - 1; j >= 0; j--) {
      if (parsedArray[i][j] === '.') {
        parsedArray[i].splice(-1)
      }
      else break
    }
    if (x < parsedArray[i].length) {
      x = parsedArray[i].length
    }
    if (i === parsedArray.length - 1 && parsedArray[i].length === 0) {
      parsedArray.splice(-1)
    }
  }
  let result = `x = ${x}, y = ${parsedArray.length}\n`
  for (let i = 0; i < parsedArray.length; i++) {
    let current
    let count = 0
    for (let j = 0; j < parsedArray[i].length; j++) {
      const value = parsedArray[i][j]
      if (current === value) count++
      else {
        if (current) {
          result += `${count === 1 ? '' : count}${current === 'O' ? 'o' : 'b'}`
        }
        count = 1
        current = value
      }
    }
    if (current) {
      result += `${count === 1 ? '' : count}${current === 'O' ? 'o' : 'b'}`
    }
    if (i < parsedArray.length - 1) result += '$'
  }
  result += '!'

  return result
}

module.exports = { decodeRLE, encodeRLE }