import Laptop from "entities/laptop";

export default class SortLaptopsByAscendingPriceService {
  public execute(laptops: Laptop[]): Laptop[] {
    return laptops.sort((a: Laptop, b: Laptop) => a.price - b.price);
  }
}
