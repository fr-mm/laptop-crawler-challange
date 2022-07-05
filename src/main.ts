import APIv1 from "apis/apiv1";
import LaptopsFactory from "factories/laptopsFactory";
import * as puppeteer from "puppeteer";
import { Page } from "puppeteer";
import GetLaptopPagesURLsByBrandService from "services/getLaptopPagesURLsByBrandService";
import GetLaptopsByBrandSortedByAscendingPriceService from "services/getLaptopsByBrandSortedByAscendingPriceService";
import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";
import ScrapeLaptopPageDTOFromURLService from "services/scrapeLaptopPageDTOFromURLService";
import SortLaptopsByAscendingPriceService from "services/sortLaptopsByAscendingPriceService";

class Main {
  public async execute(): Promise<void> {
    const page = await this.buildPage();
    const parseLaptopDescriptionService = new ParseLaptopDescriptionService();
    const laptopsFactory = new LaptopsFactory(parseLaptopDescriptionService);
    const getLaptopPagesURLsByBrandService =
      new GetLaptopPagesURLsByBrandService(page);
    const scrapeLaptopPageDTOFromURLService =
      new ScrapeLaptopPageDTOFromURLService(page);
    const sortLaptopsByAscendingPriceService =
      new SortLaptopsByAscendingPriceService();
    const getLaptopsByBrandSortedByAscendingPriceService =
      new GetLaptopsByBrandSortedByAscendingPriceService({
        laptopsFactory: laptopsFactory,
        getLaptopPagesURLsByBrandService: getLaptopPagesURLsByBrandService,
        scrapeLaptopPageDTOFromURLService: scrapeLaptopPageDTOFromURLService,
        sortLaptopsByAscendingPriceService: sortLaptopsByAscendingPriceService,
      });
    const api = new APIv1(getLaptopsByBrandSortedByAscendingPriceService);
    api.start();
  }

  private async buildPage(): Promise<Page> {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    return (await browser.pages())[0];
  }
}

new Main().execute();
