const { readFile } = require('../fileService')
const fs = require('fs').promises

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue()
  }
}))

describe('File Service', () => {

  const gliderText = `#N Glider
  #O Richard K. Guy
  #C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
  #C www.conwaylife.com/wiki/index.php?title=Glider
  x = 3, y = 3, rule = B3/S23
  bob$2bo$3o!`

  it('returns file content if valid rle file is given', async () => {
    fs.readFile.mockImplementation(() => gliderText)
    const content = await readFile('glider.rle')
    expect(content).toEqual(gliderText)
  })

  it('returns undefined if file extension is not .rle', async () => {
    fs.readFile.mockImplementation(() => gliderText)
    const content = await readFile('glider.txt')
    expect(content).toBeUndefined()
  })

  it('returns undefined if an error occures in filesystem', async () => {
    fs.readFile.mockImplementation(() => { throw new Error('io error') })
    const content = await readFile('block.rle')
    expect(content).toBeUndefined()
  })

})