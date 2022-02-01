// I just wrote this code without unit tets what would probably be best to do
// the code is new because the original is pretty messy and I didn't have time to analyze and refactor that one

const MINIMUM_QUALITY = 0
const MAXIMUM_QUALITY = 50

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
    this.updates = [
      new AgedBrieUpdate(MAXIMUM_QUALITY, MINIMUM_QUALITY),
      new BackstagePassUpdate(MAXIMUM_QUALITY, MINIMUM_QUALITY),
      new SulfurasUpdate(MAXIMUM_QUALITY, MINIMUM_QUALITY),
      new Update(MAXIMUM_QUALITY, MINIMUM_QUALITY),
    ]
  }

  updateQuality() {
    this.items.forEach(item => {
      const update = this.updates.find(update => update.shouldBeUpdated(item));
      update.doChange(item);

    })
    return this.items;
  }
}

class Update{

  constructor(maximumQuality, minimumQuality) {
    this.maximumQuality = maximumQuality;
    this.minimumQuality = minimumQuality;
  }
 
  shouldBeUpdated(item) {
    return true;
  }

  setQuality(item, value) {
    if (value < this.maximumQuality && value > this.minimumQuality) {
      item.quality = value;
    } else if (value >= this.maximumQuality) {
      item.quality = this.maximumQuality;
    } else if (value <= this.minimumQuality) {
      item.quality = this.minimumQuality;
    }
  }

  doChange(item) {
    const QUALITY_DECREASE = item.sellIn < 1 ? 2 : 1;
    this.setQuality(item, item.quality - QUALITY_DECREASE);
    item.sellIn -= 1;
  }
}

class AgedBrieUpdate extends Update{

  shouldBeUpdated(item) {
    return item.name === 'Aged Brie';
  }

  doChange(item) {
    item.sellIn -= 1;
    const QUALITY_INCREASE = (item.sellIn < 0) ? 2 : 1;
    super.setQuality(item, item.quality + QUALITY_INCREASE);
  }
}

class SulfurasUpdate extends Update{

  shouldBeUpdated(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  doChange(item) {
    //do nothing because we don't change Selfuras
  }
}

class BackstagePassUpdate extends Update{
  shouldBeUpdated(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  doChange(item) {
    let QUALITY_INCREASE = 1;
    if (item.sellIn < 1) {
      QUALITY_INCREASE = - item.quality;
    } else if (item.sellIn < 6) {
      QUALITY_INCREASE = 3;
    } else if (item.sellIn < 11) {
      QUALITY_INCREASE = 2;
    }

    super.setQuality(item, item.quality + QUALITY_INCREASE);
    item.sellIn -= 1;
  }
}

// TEST
// you can play here to test

// let items = [
//   new Item('+5 Dexterity Vest', 5, 10),
//   new Item('Aged Brie', 5, 0),
//   new Item('Elixir of the Mongoose', 5, 7),
//   new Item('Sulfuras, Hand of Ragnaros', 6, 40),
//   new Item('Backstage passes to a TAFKAL80ETC concert', 13, 20),
//   new Item('Conjured Mana Cake', 2, 4)
// ];

// let gildedRose = new Shop(items);
// gildedRose.updateQuality(items)
// console.log(gildedRose.items)

module.exports = {
  Item,
  Shop
};

