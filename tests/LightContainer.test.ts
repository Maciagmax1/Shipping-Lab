import { LightContainer } from "../src/LightContainer";
import ShippingContainer from "../src/models/ShippingContainer";

describe("LightContainer class", () => {
  test("The destination and cargoWeight properties are set from the constructor parameters", () => {
    const container: LightContainer = new LightContainer("Detroit", 100000);
    expect(container.destination).toBe("Detroit");
    expect(container.cargoWeight).toBe(100000);
  });
  test("cargoWeight defaults to 0, when the second constructor parameter is omitted", () => {
    const container: LightContainer = new LightContainer("Detroit");
    expect(container.destination).toBe("Detroit");
    expect(container.cargoWeight).toBe(0);
  });
  test("The destination and cargoWeight properties are set from the constructor parameters.", () => {
    const container: LightContainer = new LightContainer("Detroit", 100000);
    expect(container.destination).toBe("Detroit");
    expect(container.getGrossWeight()).toBe(100000);
  });
  test("The destination and cargoWeight properties are set from the constructor parameters.", () => {
    const container: LightContainer = new LightContainer("Detroit", 10);
    expect(container.destination).toBe("Detroit");
    expect(container.getGrossWeight()).toBe(10);
  });
});
