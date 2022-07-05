import LaptopPageDTO from "dtos/LaptopPageDTO";
import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";
import LaptopFactory from "factories/laptopFactory";
import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";
import PriceByHDD from "valueObjects/priceByHDD";
import Reviews from "valueObjects/reviews";

let laptopPageDTO: LaptopPageDTO;
let laptopFactory: LaptopFactory;

beforeAll(() => {
  laptopPageDTO = new LaptopPageDTO({
    description:
      'Lenovo V110-15IAP, 15.6" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home',
    pricesByHDD: [
      new PriceByHDDDTO("128", "$321.94"),
      new PriceByHDDDTO("256", "$341.94"),
    ],
    reviews: new ReviewsDTO({ amount: 3, starts: 4 }),
  });
  const parseLaptopDescriptionService = new ParseLaptopDescriptionService();
  laptopFactory = new LaptopFactory(parseLaptopDescriptionService);
});

describe("LaptopFactory", () => {
  describe("buildFromPage", () => {
    it("should return laptop with expected brand", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedBrand = "Lenovo";
      expect(laptop.brand).toBe(expectedBrand);
    });

    it("should return laptop with expected model", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedModel = "V110-15IAP";
      expect(laptop.model).toBe(expectedModel);
    });

    it("should return laptop with expected screen", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedScreen = '15.6" HD';
      expect(laptop.screen).toBe(expectedScreen);
    });

    it("should return laptop with expected processor", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedProcessor = "Celeron N3350 1.1GHz";
      expect(laptop.processor).toBe(expectedProcessor);
    });

    it("should return laptop with expected ram", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedRam = "4GB";
      expect(laptop.ram).toBe(expectedRam);
    });

    it("should return laptop with expected hd", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedHD = "128GB SSD";
      expect(laptop.hd).toBe(expectedHD);
    });

    it("should return laptop with expected os", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedOS = "Windows 10 Home";
      expect(laptop.os).toBe(expectedOS);
    });

    it("should return laptop with expected currency", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedCurrency = "$";
      expect(laptop.currency).toBe(expectedCurrency);
    });

    it("should return laptop with expected pricesByHDD", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedPricesByHDD = [
        new PriceByHDD("128", 321.94),
        new PriceByHDD("256", 341.94),
      ];
      expect(laptop.pricesByHDD).toStrictEqual(expectedPricesByHDD);
    });

    it("should return laptop with expected reviews", async () => {
      const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);

      const expectedReviews = new Reviews({ amount: 3, stars: 4 });
      expect(laptop.reviews).toStrictEqual(expectedReviews);
    });
  });
});
