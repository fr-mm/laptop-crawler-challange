import APIv1 from "apis/apiv1";
import Laptop from "entities/laptop";
import LaptopsFactory from "factories/laptopsFactory";
import GetLaptopPagesURLsByBrandService from "services/getLaptopPagesURLsByBrandService";
import GetLaptopsByBrandSortedByAscendingPriceService from "services/getLaptopsByBrandSortedByAscendingPriceService";
import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";
import ScrapeLaptopPageDTOFromURLService from "services/scrapeLaptopPageDTOFromURLService";
import SortLaptopsByAscendingPriceService from "services/sortLaptopsByAscendingPriceService";
import request from "supertest";
import Reviews from "valueObjects/reviews";

jest.setTimeout(60000);

let parseLaptopDescriptionService: ParseLaptopDescriptionService;
let laptopsFactory: LaptopsFactory;
let getLaptopPagesURLsByBrandService: GetLaptopPagesURLsByBrandService;
let scrapeLaptopPageDTOFromURLService: ScrapeLaptopPageDTOFromURLService;
let sortLaptopsByAscendingPriceService: SortLaptopsByAscendingPriceService;
let getLaptopsByBrandSortedByAscendingPriceService: GetLaptopsByBrandSortedByAscendingPriceService;
let apiv1: APIv1;

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(jest.fn());
  parseLaptopDescriptionService = new ParseLaptopDescriptionService();
  laptopsFactory = new LaptopsFactory(parseLaptopDescriptionService);
  getLaptopPagesURLsByBrandService = new GetLaptopPagesURLsByBrandService(page);
  scrapeLaptopPageDTOFromURLService = new ScrapeLaptopPageDTOFromURLService(
    page
  );
  sortLaptopsByAscendingPriceService = new SortLaptopsByAscendingPriceService();
  getLaptopsByBrandSortedByAscendingPriceService =
    new GetLaptopsByBrandSortedByAscendingPriceService({
      laptopsFactory: laptopsFactory,
      getLaptopPagesURLsByBrandService: getLaptopPagesURLsByBrandService,
      scrapeLaptopPageDTOFromURLService: scrapeLaptopPageDTOFromURLService,
      sortLaptopsByAscendingPriceService: sortLaptopsByAscendingPriceService,
    });
  apiv1 = new APIv1(getLaptopsByBrandSortedByAscendingPriceService);
  apiv1.start();
});

afterAll(() => {
  apiv1.stop();
});

describe("APIv1", () => {
  describe("/lenovo", () => {
    const endpoint = "/lenovo";
    it("should return status code 200", async () => {
      const result = await request(apiv1.app).get(endpoint);

      expect(result.status).toBe(200);
    });

    it("should return body with more than one item", async () => {
      const result = await request(apiv1.app).get(endpoint);

      expect(result.body.length).toBeGreaterThan(1);
    });

    it("should return response with expected where first result has same keys as a Laptop", async () => {
      const dummyLaptop = new Laptop({
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
        price: 0,
        reviews: new Reviews({ amount: 0, stars: 0 }),
      });

      const result = await request(apiv1.app).get(endpoint);

      const firstResultKeys = Object.keys(result.body[0]).sort();
      const expectedKeys = Object.keys(dummyLaptop).sort();
      expect(firstResultKeys).toEqual(expectedKeys);
    });
  });
});
