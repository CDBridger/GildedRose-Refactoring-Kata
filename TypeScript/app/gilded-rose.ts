export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const AGED_BRIE = "Aged Brie";
export const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
export const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const CONJURED = "Conjured";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const isAgedBrie = item.name === AGED_BRIE;
      const isBackstagePasses = item.name === BACKSTAGE_PASSES;
      const isSulfuras = item.name === SULFURAS;
      const isConjured = item.name.includes(CONJURED);
      if (!isAgedBrie && !isBackstagePasses) {
        if (item.quality > 0) {
          if (!isSulfuras) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (isBackstagePasses) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (!isSulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePasses) {
            if (item.quality > 0) {
              if (!isSulfuras && !isConjured) {
                item.quality = item.quality - 1;
              } else if (isConjured) {
                //Conjured items degrade in Quality twice as fast as normal items (4 vs 2 of normal items)
                item.quality = Math.max(item.quality - 3, 0);
              }
            }
          } else {
            //Back stage pases quality drops to 0 after the concert
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            //Aged Brie increases in quality the older it gets
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
