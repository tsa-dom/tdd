var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilder Rose", () => {

  it("empty shop update returns an empty list", () => {
    const gildedRose = new Shop()
    const items = gildedRose.updateQuality()
    expect(items).to.deep.equal([])
  })

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  })

  it("quality of an item decreases everyday", () => {
    const gildedRose = new Shop([new Item("foo", 10, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(9)
  })

  it("quality of an item decreases twice as fast when sell by date has passed", () => {
    const gildedRose = new Shop([new Item("foo", 0, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(8)
  })

  it("quality does not decrease twice as fast when there are days remaining", () => {
    const gildedRose = new Shop([new Item("foo", 1, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(9)
  })

  it("sell by date decreases everyday", () => {
    const gildedRose = new Shop([new Item("foo", 10, 10)])
    const items = gildedRose.updateQuality()
    expect(items[0].sellIn).to.equal(9)
  })

  it("quality cannot be smaller than zero", () => {
    const gildedRose = new Shop([new Item("foo", 10, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).to.equal(0)
  })

  describe("Aged Brie", () => {

    it("quality increases when the item comes older", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(11)
    })

    it("quality increases twice as fast when sell by date passes", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(12)
    })

    it("quality does not increase twice as fast when there are days remaining", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(11)
    })

    it("quality does not increase when it's over 50", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 50)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(50)
    })

  })

  describe("Sulfuras, Hand of Ragnaros", () => {

    it("quality does not decrease", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(10)
    })

    it("the item does not become older", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].sellIn).to.equal(10)
    })

    it("quality cannot be greater than 80", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 81)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(80)
    })

  })

  describe("Backstage passes to a TAFKAL80ETC concert", () => {

    it("quality increases by 1 when there are more than 10 days", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(11)
    })

    it("quality increases by 2 when there are 10 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(12)
    })

    it("quality increases by 3 when there are 5 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(13)
    })

    it("quality drops to zero when sell by date passes", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(0)
    })

  })

  describe("Conjured", () => {

    it("decrades quality twice as fast", () => {
      const gildedRose = new Shop([new Item("Conjured", 10, 10)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(8)
    })

  })

})
