const { hardFunction } = require('../src/hardFunction.mjs')
const axios = require('axios')
const fs = require('fs').promises

jest.mock('axios', () => ({
  get: jest.fn()
}))

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn()
  }
}))

beforeEach(() => {
  axios.get.mockImplementation(() => ({ dateString: '2022-01-28T18:50:46.000Z' }))
  jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
  fs.readFile.mockImplementation(() => '13')
  fs.writeFile.mockImplementation(() => undefined)  
  jest.useFakeTimers().setSystemTime(new Date('2022-07-13').getTime())
})

describe('Hard function', () => {

  it('returns 58 if the file contains number 13 and the time is correct', async () => {
    const result = await hardFunction()
    expect(result).toEqual(58)
  })

  it('returns undefined if api response throws an error', async () => {
    axios.get.mockImplementation(() => { throw new Error('server error') })
    const result = await hardFunction()
    expect(result).toBeUndefined()
  })

  it('returns wrong value if global time is invalid', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-07-13').getTime())
    const result = await hardFunction()
    expect(result).not.toEqual(58)
  })

  it('returns undefined if write fails', async () => {
    fs.writeFile.mockImplementation(() => { throw new Error('io error') })
    const result = await hardFunction()
    expect(result).toBeUndefined()
  })

  it('returns undefined if read fails', async () => {
    fs.readFile.mockImplementation(() => { throw new Error('io error') })
    const result = await hardFunction()
    expect(result).toBeUndefined()
  })

  it('returns undefined if random returns wrong value', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
    const result = await hardFunction()
    expect(result).not.toEqual(58)
  })

})