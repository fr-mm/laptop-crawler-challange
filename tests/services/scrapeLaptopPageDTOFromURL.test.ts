import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";
import ScrapeLaptopPageDTOFromURL from "services/scrapeLaptopPageDTOFromURL";

let url: string;
let scrapeLaptopPageDTOFromPage: ScrapeLaptopPageDTOFromURL;

jest.setTimeout(10000);

beforeAll(async () => {
  url = "https://webscraper.io/test-sites/e-commerce/allinone/product/548";
  scrapeLaptopPageDTOFromPage = new ScrapeLaptopPageDTOFromURL(page);
});

describe("ScrapeLaptopPageDTOFromPage", () => {
  describe("execute", () => {
    it("should return dto with expected description", async () => {
      const laptopPageDTO = await scrapeLaptopPageDTOFromPage.execute(url);

      const expectedDescription =
        'Lenovo V110-15IAP, 15.6" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home';
      expect(laptopPageDTO.description).toBe(expectedDescription);
    });
    it("should return dto with expected pricesByHDD", async () => {
      const laptopPageDTO = await scrapeLaptopPageDTOFromPage.execute(url);

      const expectedPricesByHDD = [
        new PriceByHDDDTO("128", "$321.94"),
        new PriceByHDDDTO("256", "$341.94"),
        new PriceByHDDDTO("512", "$361.94"),
      ];
      expect(laptopPageDTO.pricesByHDD).toStrictEqual(expectedPricesByHDD);
    });

    it("should return dto with expected reviews", async () => {
      const laptopPageDTO = await scrapeLaptopPageDTOFromPage.execute(url);

      const expectedReviews = new ReviewsDTO({ amount: 5, starts: 3 });
      expect(laptopPageDTO.reviews).toStrictEqual(expectedReviews);
    });
  });
});