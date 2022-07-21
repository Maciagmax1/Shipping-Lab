import {
  findContainerByDestination,
  findOverWeightTransporters,
  isSafeToAddContainer,
} from "../src/functions";
import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import ShippingContainer from "../src/models/ShippingContainer";
import { Transporter } from "../src/models/Transporter";
import { Ship } from "../src/Ship";
import { Truck } from "../src/Truck";

describe("findContainerByDestination function", () => {
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

describe("findOverWeightTransporters function", () => {
  test("return only overweight trucks", () => {
    const truckArray: Transporter[] = [];
    const truck1: Truck = new Truck(100);
    const truck2: Truck = new Truck(200);
    truck1.addContainer(new LightContainer("Detroit", 150));
    truck2.addContainer(new LightContainer("Miami", 150));
    truckArray.push(truck1);
    truckArray.push(truck2);
    expect(findOverWeightTransporters(truckArray)).toEqual([truck1]);
  });
  test("return only overweight transporters", () => {
    const transporterArray: Transporter[] = [];
    const truck1: Truck = new Truck(200);
    const ship1: Ship = new Ship(100);
    truck1.addContainer(new LightContainer("Detroit", 150));
    ship1.addContainer(new LightContainer("Miami", 150));
    transporterArray.push(truck1);
    transporterArray.push(ship1);
    expect(findOverWeightTransporters(transporterArray)).toEqual([ship1]);
  });
  test("return empty array when given no overweight transporters", () => {
    const transporterArray: Transporter[] = [];
    const truck1: Truck = new Truck(1000);
    const ship1: Ship = new Ship(1000);
    truck1.addContainer(new LightContainer("Detroit", 150));
    ship1.addContainer(new LightContainer("Miami", 150));
    transporterArray.push(truck1);
    transporterArray.push(ship1);
    expect(findOverWeightTransporters(transporterArray)).toEqual([]);
  });
  test("return empty array when given no overweight transporters", () => {
    const transporterArray: Transporter[] = [];
    expect(findOverWeightTransporters(transporterArray)).toEqual([]);
  });
});

describe("isSafeToAddContainer function", () => {
  test("isSafeToAddContainer returns true for an empty ship and empty LightContainer when transporter maxWeight is 5000", () => {
    const ship1: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit");
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a LightContainer with some cargo, but less than maxWeight", () => {
    const ship1: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit", 2500);
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a HeavyContainer with some cargo, but less than maxWeight", () => {
    const ship1: Ship = new Ship(5000);
    const container: ShippingContainer = new HeavyContainer(
      100,
      "Detroit",
      2500
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("isSafeToAddContainer returns false for an empty ship and a LightContainer with some cargo, more than maxWeight", () => {
    const ship1: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit", 6000);
    expect(isSafeToAddContainer(ship1, container)).toBe(false);
  });
  test("isSafeToAddContainer returns false for an empty ship and a HeavyContainer with some cargo, more than maxWeight", () => {
    const ship1: Ship = new Ship(5000);
    const container: ShippingContainer = new HeavyContainer(
      100,
      "Detroit",
      5000
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(false);
  });
  test("isSafeToAddContainer returns true for an empty ship and a container with the same gross weight as the maxWeight", () => {
    const ship1: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit", 5000);
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("Create a ship with one or more containers already added. isSafeToAddContainer returns true for a container that is light enough to be added to this ship", () => {
    const ship1: Ship = new Ship(5000);
    ship1.addContainer(new LightContainer("Miami", 1000));
    const container1: ShippingContainer = new LightContainer("Detroit", 1000);
    expect(isSafeToAddContainer(ship1, container1)).toBe(true);
  });
  test("Create a ship with one or more containers already added. isSafeToAddContainer returns false for a container that is too heavy to be added to this ship", () => {
    const ship1: Ship = new Ship(1000);
    ship1.addContainer(new LightContainer("Miami", 1000));
    const container1: ShippingContainer = new LightContainer("Detroit", 1000);
    expect(isSafeToAddContainer(ship1, container1)).toBe(false);
  });
});
