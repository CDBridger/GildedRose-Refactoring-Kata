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
    for (let i = 0; i < this.items.length; i++) {
      const isAgedBrie = this.items[i].name == AGED_BRIE;
      const isBackstagePasses = this.items[i].name == BACKSTAGE_PASSES;
      const isSulfuras = this.items[i].name == SULFURAS;
      const isConjured = this.items[i].name.includes(CONJURED);
      if (!isAgedBrie && !isBackstagePasses) {
        if (this.items[i].quality > 0) {
          if (!isSulfuras) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (isBackstagePasses) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (!isSulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePasses) {
            if (this.items[i].quality > 0) {
              if (!isSulfuras && !isConjured) {
                this.items[i].quality = this.items[i].quality - 1;
              } else if (isConjured) {
                //Conjured items degrade in Quality twice as fast as normal items (4 vs 2 of normal items)
                this.items[i].quality = Math.max(this.items[i].quality - 3, 0);
              }
            }
          } else {
            //Back stage pases quality drops to 0 after the concert
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            //Aged Brie increases in quality the older it gets
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
