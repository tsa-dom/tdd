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

  it('array is encoded to RLE format', () => {
    const encoded = encodeRLE(array)
    expect(encoded).toEqual(RLE)
  })

  it('decoder understands Glider\'s patternfile', () => {
    const decoded = decodeRLE(`#N Glider
#O Richard K. Guy
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Glider
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`)
    expect(decoded).toEqual([
      ['.', 'O', '.'],
      ['.', '.', 'O'],
      ['O', 'O', 'O'],
    ])
  })

  it('decoder understands Blinker\'s pattern file', () => {
    const decoded = decodeRLE(`#N Blinker
#O John Conway
#C A period 2 oscillator that is the smallest and most common oscillator.
#C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 1, rule = B3/S23
3o!`)
    expect(decoded).toEqual([
      ['O', 'O', 'O']
    ])
  })

  it('decoder understands Block\'s pattern file', () => {
    const decoded = decodeRLE(`#N Block
#C An extremely common 4-cell still life.
#C www.conwaylife.com/wiki/index.php?title=Block
x = 2, y = 2, rule = B3/S23
2o$2o!`)
    expect(decoded).toEqual([
      ['O', 'O'],
      ['O', 'O'],
    ])
  })

  it('decoder understands the bottom line of the Backrake1', () => {
    const decoded = decodeRLE('x = 27, y = 1\n12bobo')
    expect(decoded).toEqual([
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ]
    ])
  })

  const backrake1Array = [
    ['.', '.', '.', '.', '.', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', 'O', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', '.', '.', ],
    ['.', '.', '.', 'O', 'O', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', 'O', 'O', '.', '.', '.', ],
    ['.', '.', 'O', '.', 'O', '.', 'O', 'O', '.', 'O', 'O', '.', '.', '.', '.', '.', 'O', 'O', '.', 'O', 'O', '.', 'O', '.', 'O', '.', '.', ],
    ['.', 'O', 'O', '.', 'O', '.', '.', '.', '.', 'O', '.', 'O', 'O', '.', 'O', 'O', '.', 'O', '.', '.', '.', '.', 'O', '.', 'O', 'O', '.', ],
    ['O', '.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', 'O', '.', 'O', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', '.', '.', 'O', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['O', 'O', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', '.', 'O', '.', 'O', '.', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', 'O', '.', '.', '.', '.', 'O', 'O', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
  ]

  it('decoder understands Backrake1 pattern file', () => {
    const decoded = decodeRLE(`#N Backrake 1
#O Jason Summers
#C An orthogonal period 8 c/2 backrake.
#C www.conwaylife.com/wiki/index.php?title=Backrake_1
x = 27, y = 18, rule = B3/S23
5b3o11b3o5b$4bo3bo9bo3bo4b$3b2o4bo7bo4b2o3b$2bobob2ob2o5b2ob2obobo2b$b
2obo4bob2ob2obo4bob2ob$o4bo3bo2bobo2bo3bo4bo$12bobo12b$2o7b2obobob2o7b
2o$12bobo12b$6b3o9b3o6b$6bo3bo9bo6b$6bobo4b3o11b$12bo2bo4b2o5b$15bo11b
$11bo3bo11b$11bo3bo11b$15bo11b$12bobo!`)
    expect(decoded).toEqual(backrake1Array)
  })

  it('encoder converts Backrake1 pattern to RLE', () => {
    const encoded = encodeRLE(backrake1Array)
    expect(encoded).toEqual(`x = 27, y = 18
5b3o11b3o$4bo3bo9bo3bo$3b2o4bo7bo4b2o$2bobob2ob2o5b2ob2obobo$b2obo4bob
2ob2obo4bob2o$o4bo3bo2bobo2bo3bo4bo$12bobo$2o7b2obobob2o7b2o$12bobo$6b
3o9b3o$6bo3bo9bo$6bobo4b3o$12bo2bo4b2o$15bo$11bo3bo$11bo3bo$15bo$12bob
o!`)
  })

})