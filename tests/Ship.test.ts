import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import { Ship } from "../src/Ship";
import { findContainerByDestination } from "../src/functions";

describe("Ship class", () => {
  test("The maxWeight property is set from the constructor parameter", () => {
    const ship: Ship = new Ship(1000);
    expect(ship.maxWeight).toBe(1000);
  });
  test("The containers property is set to an empty array in a new Ship instance", () => {
    const ship: Ship = new Ship(1000);
    expect(ship.containers).toEqual([]);
  });
  test("Calling addContainer adds to the containers array property", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 100));
    expect(ship.containers).toEqual([
      { destination: "Detroit", cargoWeight: 100 },
    ]);
  });
  test("Calling addContainer twice adds both containers to the containers array property", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 100));
    ship.addContainer(new LightContainer("Miami", 200));
    expect(ship.containers).toEqual([
      { destination: "Detroit", cargoWeight: 100 },
      { destination: "Miami", cargoWeight: 200 },
    ]);
  });
  test("getTotalWeight returns the combined gross weight of the containers in the array", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 100));
    ship.addContainer(new HeavyContainer(200, "Miami", 200));
    expect(ship.getTotalWeight()).toBe(500);
  });
  test("getTotalWeight returns 0 when containers is empty", () => {
    const ship: Ship = new Ship(1000);
    expect(ship.getTotalWeight()).toBe(0);
  });
  test("isOverweight returns true when the total weight is greater than maxWeight", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 2000));
    expect(ship.isOverWeight()).toBe(true);
  });
  test("isOverweight returns false when the total weight is less than maxWeight", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 500));
    expect(ship.isOverWeight()).toBe(false);
  });
  test("isOverweight returns false when the total weight is equal to maxWeight", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 1000));
    expect(ship.isOverWeight()).toBe(false);
  });
  test("findContainerByDestination returning filtered array with light containers", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 1000));
    ship.addContainer(new LightContainer("Miami", 200));
    expect(findContainerByDestination(ship.containers, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 1000 },
    ]);
  });
  test("findContainerByDestination returning filtered array with light and heavy containers", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 1000));
    ship.addContainer(new HeavyContainer(200, "Miami", 200));
    expect(findContainerByDestination(ship.containers, "Miami")).toEqual([
      { destination: "Miami", cargoWeight: 200, tareWeight: 200 },
    ]);
  });
  test("findContainerByDestination funtion where none of the containers match the destination. (Expect an empty array as the result", () => {
    const ship: Ship = new Ship(1000);
    ship.addContainer(new LightContainer("Detroit", 1000));
    ship.addContainer(new HeavyContainer(200, "New York", 200));
    expect(findContainerByDestination(ship.containers, "Miami")).toEqual([]);
  });
  test("Do a test case with an empty array. (Expect an empty array as the result", () => {
    const ship: Ship = new Ship(1000);
    expect(findContainerByDestination(ship.containers, "Miami")).toEqual([]);
  });
});
