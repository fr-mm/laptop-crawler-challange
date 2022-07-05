import LaptopBrandEnum from "enums/laptopBrandEnum";
import { ElementHandle, Page } from "puppeteer";

export default class GetLaptopPagesURLsByBrandService {
  constructor(private readonly page: Page) {}

  public async execute(
    brand: LaptopBrandEnum,
    mainPageURL: string
  ): Promise<string[]> {
    await this.page.goto(mainPageURL);
    const allLaptopsHandles = await this.getAllLaptopsHandles();
    const filteredLaptopHandles = await this.filterLaptopHandlesByBrand(
      allLaptopsHandles,
      brand
    );
    return this.getLaptopPagesURLs(filteredLaptopHandles);
  }

  private async getAllLaptopsHandles(): Promise<ElementHandle[]> {
    return await page.$$(".title");
  }

  private async filterLaptopHandlesByBrand(
    laptopHandles: ElementHandle[],
    brand: LaptopBrandEnum
  ): Promise<ElementHandle[]> {
    const filteredLaptopHandles = [];

    for (const laptopHandle of laptopHandles) {
      if (await this.laptopBrandMatches(laptopHandle, brand)) {
        filteredLaptopHandles.push(laptopHandle);
      }
    }
    return filteredLaptopHandles;
  }

  private async laptopBrandMatches(
    laptopHandle: ElementHandle,
    brand: LaptopBrandEnum
  ): Promise<boolean> {
    const title = await this.page.evaluate(
      (element) => element.innerText,
      laptopHandle
    );
    return title.includes(brand);
  }

  private async getLaptopPagesURLs(
    laptopHandles: ElementHandle[]
  ): Promise<string[]> {
    const urls = [];

    for (const laptopHandle of laptopHandles) {
      const urlHandle = await laptopHandle.getProperty("href");
      const url = (await urlHandle.jsonValue()) as string;
      urls.push(url);
    }
    return urls;
  }
}
