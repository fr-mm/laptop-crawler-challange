import LaptopPageDTO from "dtos/LaptopPageDTO";
import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";
import LaptopFactory from "factories/laptopsFactory";
import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";
import Reviews from "valueObjects/reviews";

let defaultLaptopPageDTO: LaptopPageDTO;
let laptopFactory: LaptopFactory;

beforeAll(() => {
  defaultLaptopPageDTO = new LaptopPageDTO({
    id: "548",
    name: "Lenovo V110-15IAP",
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
    it("should return the expected amount of laptops", async () => {
      const laptops =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO);

      const expectedAmount = 2;
      expect(laptops.length).toBe(expectedAmount);
    });

    it("should return laptop with expected brand", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedBrand = "Lenovo";
      expect(laptop.brand).toBe(expectedBrand);
    });

    it("should return laptop with expected model", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedModel = "V110-15IAP";
      expect(laptop.model).toBe(expectedModel);
    });

    it("should return laptop with expected screen", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedScreen = '15.6\\" HD';
      expect(laptop.screen).toBe(expectedScreen);
    });

    it("should return laptop with expected processor", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedProcessor = "Celeron N3350 1.1GHz";
      expect(laptop.processor).toBe(expectedProcessor);
    });

    it("should return laptop with expected ram", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedRam = "4GB";
      expect(laptop.ram).toBe(expectedRam);
    });

    it("should return laptop with expected memory", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedMemory = "128GB SSD";
      expect(laptop.memory).toBe(expectedMemory);
    });

    it("should return laptop with expected os", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedOS = "Windows 10 Home";
      expect(laptop.os).toBe(expectedOS);
    });

    it("should return laptop with expected HDD", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedHDD = "128";
      expect(laptop.hdd).toBe(expectedHDD);
    });

    it("should return laptop with expected currency", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedCurrency = "$";
      expect(laptop.currency).toBe(expectedCurrency);
    });

    it("should return laptop with expected price", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedPricesByHDD = 321.94;
      expect(laptop.price).toBe(expectedPricesByHDD);
    });

    it("should return laptop with expected reviews", async () => {
      const laptop =
        laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

      const expectedReviews = new Reviews({ amount: 3, stars: 4 });
      expect(laptop.reviews).toStrictEqual(expectedReviews);
    });
    describe("when videoCard is present", () => {
      const laptopPageDTO = new LaptopPageDTO({
        id: "548",
        name: "Lenovo Legion Y720",
        description:
          'Lenovo Legion Y720, 15.6" FHD IPS, Core i7-7700HQ, 8GB, 128GB SSD + 2TB HDD, GeForce GTX 1060 6GB, DOS, RGB backlit keyboard',
        pricesByHDD: [
          new PriceByHDDDTO("128", "$321.94"),
          new PriceByHDDDTO("256", "$341.94"),
        ],
        reviews: new ReviewsDTO({ amount: 3, starts: 4 }),
      });
      const parseLaptopDescriptionService = new ParseLaptopDescriptionService();
      laptopFactory = new LaptopFactory(parseLaptopDescriptionService);
      it("should return laptop with expected videoCard", () => {
        const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO)[0];

        const expectedVideoCard = "GeForce GTX 1060 6GB";
        expect(laptop.videoCard).toBe(expectedVideoCard);
      });
    });

    describe("when videoCard is null", () => {
      it("should return laptop with expected videoCard", () => {
        const laptop =
          laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

        const expectedVideoCard = null;
        expect(laptop.videoCard).toBe(expectedVideoCard);
      });
    });

    describe("when network is present", () => {
      const laptopPageDTO = new LaptopPageDTO({
        id: "548",
        name: "Lenovo ThinkPad Yoga 370 Black",
        description:
          'Lenovo ThinkPad Yoga 370 Black, 13.3" FHD IPS Touch, Core i5-7200U, 8GB, 256GB SSD, 4G, Windows 10 Pro',
        pricesByHDD: [
          new PriceByHDDDTO("128", "$321.94"),
          new PriceByHDDDTO("256", "$341.94"),
        ],
        reviews: new ReviewsDTO({ amount: 3, starts: 4 }),
      });
      const parseLaptopDescriptionService = new ParseLaptopDescriptionService();
      laptopFactory = new LaptopFactory(parseLaptopDescriptionService);
      it("should return laptop with expected network", () => {
        const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO)[0];

        const expectedNetwork = "4G";
        expect(laptop.network).toBe(expectedNetwork);
      });
    });
    describe("when network is null", () => {
      it("should return laptop with expected network", () => {
        const laptop =
          laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

        const expectedNetwork = null;
        expect(laptop.network).toBe(expectedNetwork);
      });
    });

    describe("when keyboard is present", () => {
      const laptopPageDTO = new LaptopPageDTO({
        id: "548",
        name: "Lenovo Legion Y720",
        description:
          'Lenovo Legion Y720, 15.6" FHD IPS, Core i7-7700HQ, 8GB, 128GB SSD + 2TB HDD, GeForce GTX 1060 6GB, DOS, RGB backlit keyboard',
        pricesByHDD: [
          new PriceByHDDDTO("128", "$321.94"),
          new PriceByHDDDTO("256", "$341.94"),
        ],
        reviews: new ReviewsDTO({ amount: 3, starts: 4 }),
      });
      const parseLaptopDescriptionService = new ParseLaptopDescriptionService();
      laptopFactory = new LaptopFactory(parseLaptopDescriptionService);
      it("should return laptop with expected keyboard", () => {
        const laptop = laptopFactory.buildFromLaptopPageDTO(laptopPageDTO)[0];

        const expectedKeyboard = "RGB backlit keyboard";
        expect(laptop.keyboard).toBe(expectedKeyboard);
      });
    });
    describe("when keyboard is null", () => {
      it("should return laptop with expected keyboard", () => {
        const laptop =
          laptopFactory.buildFromLaptopPageDTO(defaultLaptopPageDTO)[0];

        const expectedKeyboard = null;
        expect(laptop.keyboard).toBe(expectedKeyboard);
      });
    });
  });
});
