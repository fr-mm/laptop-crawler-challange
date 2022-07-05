import Laptop from "entities/laptop";
import SortLaptopsByAscendingPriceService from "services/sortLaptopsByAscendingPriceService";
import Reviews from "valueObjects/reviews";

const buildLaptopMock = (price: number) =>
  new Laptop({
    id: "",
    brand: "",
    model: "",
    screen: "",
    processor: "",
    ram: "",
    memory: "",
    videoCard: "",
    network: "",
    os: "",
    keyboard: "",
    hdd: "",
    currency: "",
    price: price,
    reviews: new Reviews({ amount: 0, stars: 0 }),
  });

describe("SortLaptopsByAscendingPriceService", () => {
  describe("execute", () => {
    it("should return expected array", () => {
      const first = buildLaptopMock(5);
      const second = buildLaptopMock(10);
      const third = buildLaptopMock(15);
      const unsortedLaptops = [second, third, first];
      const sortLaptopsByAscendingPriceService =
        new SortLaptopsByAscendingPriceService();

      const sortedLaptops =
        sortLaptopsByAscendingPriceService.execute(unsortedLaptops);

      const expectedSortedLaptops = [first, second, third];
      expect(sortedLaptops).toStrictEqual(expectedSortedLaptops);
    });
  });
});
