import LaptopBrandEnum from "enums/laptopBrandEnum";
import GetLaptopPagesURLsByBrandService from "services/getLaptopPagesURLsByBrandService";

jest.setTimeout(10000);

let mainPageURL: string;
let getLaptopPagesURLsByBrandService: GetLaptopPagesURLsByBrandService;

beforeAll(() => {
  mainPageURL =
    "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
  getLaptopPagesURLsByBrandService = new GetLaptopPagesURLsByBrandService(page);
});

describe("GetLaptopPagesURLsByBrandService", () => {
  describe("execute ", () => {
    it("should return the expected amount of urls", async () => {
      const resultURLs = await getLaptopPagesURLsByBrandService.execute(
        LaptopBrandEnum.LENOVO,
        mainPageURL
      );

      const expectedAmount = 20;
      expect(resultURLs.length).toBe(expectedAmount);
    });

    it("should return array with expected url at first index", async () => {
      const resultURLs = await getLaptopPagesURLsByBrandService.execute(
        LaptopBrandEnum.LENOVO,
        mainPageURL
      );

      const expectedFirstURL =
        "https://webscraper.io/test-sites/e-commerce/allinone/product/548";
      expect(resultURLs[0]).toBe(expectedFirstURL);
    });
  });
});
