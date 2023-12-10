import {
  Item,
  GildedRose,
  AGED_BRIE,
  BACKSTAGE_PASSES,
  SULFURAS,
} from "@/gilded-rose";

/*
	- All items have a SellIn value which denotes the number of days we have to sell the item
	- All items have a Quality value which denotes how valuable the item is
	- At the end of each day our system lowers both values for every item

  Pretty simple, right? Well this is where it gets interesting:

    - Once the sell by date has passed, Quality degrades twice as fast
    - The Quality of an item is never negative
    - "Aged Brie" actually increases in Quality the older it gets
    - The Quality of an item is never more than 50
    - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
    Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
    Quality drops to 0 after the concert

    We have recently signed a supplier of conjured items. This requires an update to our system:

	- "Conjured" items degrade in Quality twice as fast as normal items
*/

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should increase 'Aged brie' quality", () => {
    const gildedRose = new GildedRose([new Item(AGED_BRIE, 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("should increase 'Backstage passes' quality by 1 when > 10 Days", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 20, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("should increase 'Backstage passes' quality by 2 when <= 10 Days", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it("should increase 'Backstage passes' quality by 3 when <= 5 Days", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it("should drop 'Backstage passes' quality to 0 when <= 0 Days", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should drop quality by 2 when sellIn <= 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("should not drop quality below 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should not increase quality above 50", () => {
    const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not decrease quality of 'Sulfuras'", () => {
    const gildedRose = new GildedRose([new Item(SULFURAS, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not decrease sellIn of 'Sulfuras'", () => {
    const gildedRose = new GildedRose([new Item(SULFURAS, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("should decrease sellIn", () => {
    const gildedRose = new GildedRose([new Item("foo", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
  });

  it("should decrease sellIn below 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
  });

  it("should decrease quality of 'Conjured' items by 4 when sellIn <= 0", () => {
    const gildedRose = new GildedRose([new Item("Conjured Foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it("should not decrease quality of 'Conjured' items below 0", () => {
    const gildedRose = new GildedRose([new Item("Conjured Foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
