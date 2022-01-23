import arrayShuffle from 'array-shuffle'

export class ShuffleBag {
  objects;
  bag

  constructor() {
    this.bag = []
    this.objects = []
  }

  insert(shape) {
    this.objects = this.objects.concat(shape)
  }

  shuffle() {
    this.bag = arrayShuffle(this.objects)
  }

  pop() {
    if (!this.bag.length) this.shuffle()
    return this.bag.shift()
  }
}