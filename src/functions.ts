import ShippingContainer from "./models/ShippingContainer";
import { Transporter } from "./models/Transporter";
import { Ship } from "./Ship";

const findContainerByDestination = (
  containers: ShippingContainer[],
  destination: string
): ShippingContainer[] => {
  return containers.filter((item) => item.destination === destination);
};

const findOverWeightTransporters = (
  transporters: Transporter[]
): Transporter[] => {
  return transporters.filter((item) => item.isOverWeight() === true);
};

const isSafeToAddContainer = (
  ship: Ship,
  container: ShippingContainer
): boolean => {
  if (ship.getTotalWeight() + container.getGrossWeight() <= ship.maxWeight) {
    return true;
  } else {
    return false;
  }
};

export {
  findContainerByDestination,
  findOverWeightTransporters,
  isSafeToAddContainer,
};
