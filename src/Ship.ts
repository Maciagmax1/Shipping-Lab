import ShippingContainer from "./models/ShippingContainer";
import { Transporter } from "./models/Transporter";

export class Ship implements Transporter {
  maxWeight: number;
  containers: ShippingContainer[] = [];
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
  }
  addContainer(container: ShippingContainer): void {
    this.containers.push(container);
  }
  getTotalWeight(): number {
    let sum = 0;
    this.containers.forEach((item) => {
      return (sum += item.getGrossWeight());
    });
    return sum;
  }
  isOverWeight(): boolean {
    if (this.getTotalWeight() > this.maxWeight) {
      return true;
    } else {
      return false;
    }
  }
}
