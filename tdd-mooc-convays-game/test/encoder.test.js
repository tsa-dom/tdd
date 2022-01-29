const { decodeRLE, encodeRLE } = require('../encoder')

describe('Encoder', () => {
  const RLE = 'x = 5, y = 4\n2bo$2ob2o$bobo$2bo!'
  const array = [
    ['.', '.', 'O', '.', '.'],
    ['O', 'O', '.', 'O', 'O'],
    ['.', 'O', '.', 'O', '.'],
    ['.', '.', 'O', '.', '.'],
  ]

  it('uses x and y to create an array with correct size', () => {
    const RLE = 'x = 13, y = 7\n!'
    const decoded = decodeRLE(RLE)
    expect(decoded).toEqual([
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
    ])
  })

  it('array width cannot be higher than x', () => {
    const RLE = 'x = 3, y = 3\n4o!'
    const decoded = decodeRLE(RLE)
    expect(decoded).toEqual([
      ['O', 'O', 'O'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ])
  })

  it('array height cannot be higher than y', () => {
    const RLE = 'x = 3, y = 3\no$o$o$o!'
    const decoded = decodeRLE(RLE)
    expect(decoded).toEqual([
      ['O', '.', '.'],
      ['O', '.', '.'],
      ['O', '.', '.'],
    ])
  })

  it('RLE format is decoded to an array', () => {
    const decoded = decodeRLE(RLE)
    expect(decoded).toEqual(array)
  })

  it('dead cells on the right are not included', () => {
    const encoded = encodeRLE([
      ['O', '.', '.'],
      ['.', 'O', '.'],
      ['O', '.', 'O'],
    ])
    expect(encoded).toEqual('x = 3, y = 3\no$bo$obo!')
  })

  it('dead cells on the right line reduces the width', () => {
    const encoded = encodeRLE([
      ['O', '.', '.'],
      ['.', 'O', '.'],
      ['O', 'O', '.'],
    ])
    expect(encoded).toEqual('x = 2, y = 3\no$bo$2o!')
  })

  it('dead cells on the bottom line reduces the height', () => {
    const encoded = encodeRLE([
      ['O', '.', 'O'],
      ['.', 'O', 'O'],
      ['.', '.', '.'],
    ])
    expect(encoded).toEqual('x = 3, y = 2\nobo$b2o!')
  })

  it('array is encoded to RLE format', () => {
    const encoded = encodeRLE(array)
    expect(encoded).toEqual(RLE)
  })

})