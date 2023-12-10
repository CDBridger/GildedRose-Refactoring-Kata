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

      if (isAgedBrie) {
        //Aged Brie actually increases in Quality the older it gets
        item.quality = Math.min(item.quality + 1, 50);
      } else if (isBackstagePasses) {
        if (item.sellIn <= 0) {
          //Backstage passes quality drops to 0 after the concert
          item.quality = 0;
        } else if (item.sellIn <= 5) {
          item.quality = Math.min(item.quality + 3, 50);
        } else if (item.sellIn <= 10) {
          item.quality = Math.min(item.quality + 2, 50);
        } else {
          item.quality = Math.min(item.quality + 1, 50);
        }
      } else if (isSulfuras) {
        //Sulfuras never has to be sold or decreases in Quality
        continue;
      } else if (isConjured) {
        if (item.sellIn <= 0) {
          //Conjured items degrade in Quality twice as fast as normal items (4 vs 2 of normal items)
          item.quality = Math.max(item.quality - 4, 0);
        } else {
          item.quality = Math.max(item.quality - 1, 0);
        }
      } else {
        //Normal item
        if (item.sellIn <= 0) {
          //Normal items degrade in Quality twice as fast as normal once the sell by date has passed
          item.quality = Math.max(item.quality - 2, 0);
        } else {
          item.quality = Math.max(item.quality - 1, 0);
        }
      }
      item.sellIn = item.sellIn - 1;
    }
    return this.items;
  }
}
