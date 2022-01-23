import { expect } from "chai"
import { RotatingShape } from "../src/RotatingShape.mjs"
import { ShuffleBag } from "../src/ShuffleBag.mjs"
import { Tetromino } from "../src/Tetromino.mjs"

const insertShape = (shuffleBag, shape, count) => {
  for (let i = 0; i < count; i++) {
    shuffleBag.insert(shape)
  }
}

describe("Shuffle bag", () => {

  let shuffleBag
  beforeEach(() => {
    shuffleBag = new ShuffleBag()
    for (let t in Tetromino) {
      insertShape(shuffleBag, Tetromino[t], 3)
    }
    shuffleBag.shuffle()
  })

  it("all of the shapes are returned atleast once", () => {
    let result = []
    for (let i = 0; i < 19; i++) {
      const shape = shuffleBag.pop()
      if (!result.includes(shape)) result.push(shape)
    }

    expect(result.length).to.equal(7)
  })

  it("a shape is returned after the bag is empty", () => {
    for (let i = 0; i < 200; i++) {
      const shape = shuffleBag.pop()
      if (!(shape instanceof RotatingShape)) expect(0).to.equal(1)
    }
  })

  it("after huge amount of popped shapes the difference between counts is not greater than 3", () => {
    let shapes = {}
    for (let i = 0; i < 10000; i++) {
      const shape = shuffleBag.pop()
      if (shapes[shape]) shapes[shape]++
      else shapes[shape] = 1
    }
    let values = Object.values(shapes).sort((a, b) => a - b)
    expect(values[6] - values[0]).to.lte(3)
  })

  it("there does not exist two times shape groups with all three shapes in a row", () => {
    let groupsOfThree = 0
    let current = { shape: null, count: 0 }
    for (let i = 0; i < 21; i++) {
      const shape = shuffleBag.pop()
      if (current.shape === shape) current.count++
      else {
        current = { shape, count: 1 }
      }
      if (current.count === 3) {
        groupsOfThree++
        current = { shape: null, count: 0 }
      }
    }
    expect(groupsOfThree).to.lt(2)
  })

})