class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (item.name) {
        case "Backstage passes to a TAFKAL80ETC concert":
          item.quality++;
          if (item.sellIn <= 10) item.quality++;
          if (item.sellIn <= 5) item.quality++;
          if (item.sellIn <= 0) item.quality = 0;
          break;
        case "Aged Brie":
          item.quality++;
          item.sellIn--;
          if (item.sellIn < 0) item.quality++;
        case "Sulfuras, Hand of Ragnaros":
          break
        case "Conjured":
          item.quality -= 2;
          break
        default:
          item.quality--;
          item.sellIn--;
          if (item.sellIn < 0) item.quality--;
          break;
      }

      if (item.quality < 0) item.quality = 0;
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        if (item.quality > 80) item.quality = 80;
      } else {
        if (item.quality > 50) item.quality = 50;
      }
    }
    
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
