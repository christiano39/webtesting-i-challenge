const enhancer = require("./enhancer.js");

describe("repair()", () => {
  it("fully restores durability on items with less than 100 durability", () => {
    expect(
      enhancer.repair({ name: "Sword", durability: 0, enhancement: 10 })
        .durability
    ).toBe(100);

    expect(
      enhancer.repair({ name: "Sword", durability: 50, enhancement: 10 })
        .durability
    ).toBe(100);

    expect(
      enhancer.repair({ name: "Sword", durability: 99, enhancement: 10 })
        .durability
    ).toBe(100);
  });

  it("does nothing when an item is already at 100 durability", () => {
    expect(
      enhancer.repair({ name: "Sword", durability: 100, enhancement: 10 })
        .durability
    ).toBe(100);
  });
});

describe("success()", () => {
  it("adds 1 enhancement when enhancement is not full", () => {
    expect(
      enhancer.success({ name: "Sword", durability: 50, enhancement: 12 })
        .enhancement
    ).toBe(13);

    expect(
      enhancer.success({ name: "Sword", durability: 50, enhancement: 0 })
        .enhancement
    ).toBe(1);
  });

  it("does nothing when item has 20 enhancement", () => {
    expect(
      enhancer.success({ name: "Sword", durability: 50, enhancement: 20 })
        .enhancement
    ).toBe(20);
  });
});

describe("fail()", () => {
  it("sets durability to zero when it would go to a negative number", () => {
    expect(
      enhancer.fail({ name: "Sword", durability: 4, enhancement: 10 })
        .durability
    ).toBe(0);

    expect(
      enhancer.fail({ name: "Sword", durability: 9, enhancement: 15 })
        .durability
    ).toBe(0);
  });

  it("sets durability to zero", () => {
    expect(
      enhancer.fail({ name: "Sword", durability: 5, enhancement: 10 })
        .durability
    ).toBe(0);

    expect(
      enhancer.fail({ name: "Sword", durability: 10, enhancement: 15 })
        .durability
    ).toBe(0);
  });

  it("sets durability to the correct positive value", () => {
    expect(
      enhancer.fail({ name: "Sword", durability: 50, enhancement: 10 })
        .durability
    ).toBe(45);

    expect(
      enhancer.fail({ name: "Sword", durability: 50, enhancement: 15 })
        .durability
    ).toBe(40);
  });

  it("sets enhancement to the correct value", () => {
    expect(
      enhancer.fail({ name: "Sword", durability: 50, enhancement: 16 })
        .enhancement
    ).toBe(16);

    expect(
      enhancer.fail({ name: "Sword", durability: 50, enhancement: 17 })
        .enhancement
    ).toBe(16);

    expect(
      enhancer.fail({ name: "Sword", durability: 50, enhancement: 20 })
        .enhancement
    ).toBe(19);
  });
});
