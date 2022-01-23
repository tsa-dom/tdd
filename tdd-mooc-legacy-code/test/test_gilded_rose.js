var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("empty list update returns an empty list", () => {
    const gildedRose = new Shop()
    const items = gildedRose.updateQuality()
    expect(items).to.deep.equal([])
  })

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  describe("if the item quality is 2", () => {

    it("and sell in value is zero", () => {
      const gildedRose = new Shop([new Item("foo", 0, 2)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(0)
    })

    it("and sell in value is one", () => {
      const gildedRose = new Shop([new Item("foo", 1, 2)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(1)
    })
  })

  describe("if the item quality is zero", () => {

    it("then the quality does not decrease", () => {
      const gildedRose = new Shop([new Item("foo", 0, 0)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(0)
    })
  })

  describe("an item name is 'Aged Brie'", () => {

    it("and quality of the item is 47", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 47)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(49)
    })

    it("and quality of the item is 49", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 49)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(50)
    })

    it("and quality of the item is 50", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 50)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(50)
    })

  })

  describe("an item name is 'Backstage passes to a TAFKAL80ETC concert'", () => {

    it("quality does not drop to zero when sell in value is 1", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(50)
    })

    it ("and quality of the item is 45, then the quality goes to zero", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 45)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(0)
    })

    it ("and quality of the item is 49, then the quality goes to zero", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(0)
    })
    
    describe("and sell in value of the item is", () => {

      it("5, then the quality increases by 3", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 45)])
        const items = gildedRose.updateQuality()
        expect(items[0].quality).to.equal(48)
      })

      it("6, then the quality increases by 2", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 45)])
        const items = gildedRose.updateQuality()
        expect(items[0].quality).to.equal(47)
      })

      it("11, then the quality increases by 1", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 45)])
        const items = gildedRose.updateQuality()
        expect(items[0].quality).to.equal(46)
      })
    })
  })

  describe("an item name is 'Sulfuras, Hand of Ragnaros'", () => {

    it("sell in value is not decreased", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(0);
    })

    describe("and sell in value is zero", () => {

      it("then the quality does not decrease", () => {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 10)])
        const items = gildedRose.updateQuality()
        expect(items[0].quality).to.equal(10)
      })

    })

    describe("and sell in value is -1", () => {

      it("then the quality does not decrease", () => {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 10)])
        const items = gildedRose.updateQuality()
        expect(items[0].quality).to.equal(10)
      })
  
    })

  })

});
