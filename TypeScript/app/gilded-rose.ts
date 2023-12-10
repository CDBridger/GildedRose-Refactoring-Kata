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
        if (item.quality > 0 && !isSulfuras) {
          item.quality = item.quality - 1;
        }
      } else {
        //Aged Brie increases in quality the older it gets
        item.quality = Math.min(item.quality + 1, 50);
        if (isBackstagePasses) {
          //"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
          //Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
          if (item.sellIn <= 5) {
            item.quality = Math.min(item.quality + 2, 50);
          } else if (item.sellIn <= 10) {
            item.quality = Math.min(item.quality + 1, 50);
          }
        }
      }
      //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
      if (!isSulfuras) {
        item.sellIn = item.sellIn - 1;
      }

      // Aged Brie increases in Quality the older it gets (nowhere in spec does it say after sell date it increases twice as fast)
      // Double degradation != double increase
      if (item.sellIn < 0 && !isAgedBrie) {
        if (isBackstagePasses) {
          //Back stage pases quality drops to 0 after the concert
          item.quality = 0;
          continue;
        }

        if (item.quality > 0) {
          if (isConjured) {
            //Conjured items degrade in Quality twice as fast as normal items (4 vs 2 of normal items)
            item.quality = Math.max(item.quality - 3, 0);
          } else if (!isSulfuras) {
            item.quality = item.quality - 1;
          }
        }
      }
    }

    return this.items;
  }
}
