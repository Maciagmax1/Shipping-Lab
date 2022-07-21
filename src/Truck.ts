import ShippingContainer from "./models/ShippingContainer";
import { Transporter } from "./models/Transporter";

export class Truck implements Transporter {
  maxWeight: number;
  container: ShippingContainer | null = null;
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
  }
  addContainer(container: ShippingContainer): void {
    this.container = container;
  }
  getTotalWeight(): number {
    if (this.container) {
      return this.container.getGrossWeight();
    } else {
      return 0;
    }
  }
  isOverWeight(): boolean {
    if (this.container) {
      return this.container.getGrossWeight() > this.maxWeight;
    } else {
      return false;
    }
  }
}
