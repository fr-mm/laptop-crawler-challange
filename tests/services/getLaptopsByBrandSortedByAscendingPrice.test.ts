import LaptopBrandEnum from "enums/laptopBrandEnum";
import LaptopsFactory from "factories/laptopsFactory";
import GetLaptopPagesURLsByBrandService from "services/getLaptopPagesURLsByBrandService";
import GetLaptopsByBrandSortedByAscendingPriceService from "services/getLaptopsByBrandSortedByAscendingPriceService";
import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";
import ScrapeLaptopPageDTOFromURLService from "services/scrapeLaptopPageDTOFromURLService";
import SortLaptopsByAscendingPriceService from "services/sortLaptopsByAscendingPriceService";

jest.setTimeout(60000);

let getLaptopsByBrandSortedByAscendingPriceService: GetLaptopsByBrandSortedByAscendingPriceService;

beforeAll(() => {
  getLaptopsByBrandSortedByAscendingPriceService =
    new GetLaptopsByBrandSortedByAscendingPriceService({
      laptopsFactory: new LaptopsFactory(new ParseLaptopDescriptionService()),
      getLaptopPagesURLsByBrandService: new GetLaptopPagesURLsByBrandService(
        page
      ),
      scrapeLaptopPageDTOFromURLService: new ScrapeLaptopPageDTOFromURLService(
        page
      ),
      sortLaptopsByAscendingPriceService:
        new SortLaptopsByAscendingPriceService(),
    });
});

describe("GetLaptopsByBrandSortedByAscendingPriceService", () => {
  describe("execute", () => {
    it("should return the expected amount of laptops", async () => {
      const laptops =
        await getLaptopsByBrandSortedByAscendingPriceService.execute(
          LaptopBrandEnum.LENOVO
        );

      const expectedAmountOfLaptops = 60;
      expect(laptops.length).toBe(expectedAmountOfLaptops);
    });
  });
});
