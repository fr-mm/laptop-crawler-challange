import LaptopPageDTO from "dtos/LaptopPageDTO";
import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";
import { ElementHandle, Page } from "puppeteer";

export default class ScrapeLaptopPageDTOFromURLService {
  constructor(private readonly page: Page) {}

  public async execute(url: string): Promise<LaptopPageDTO> {
    await this.page.goto(url);
    //await this.page.waitForNavigation();

    const id = this.getId();
    const description = await this.getDescription();
    const pricesByHDDDTOs = await this.getPricesByHDD();
    const reviewsDTO = await this.getReviewsDTOs();

    return new LaptopPageDTO({
      id: id,
      description: description,
      pricesByHDD: pricesByHDDDTOs,
      reviews: reviewsDTO,
    });
  }

  private getId(): string {
    const url = this.page.url();
    const spliturl = url.split("/");
    return spliturl[spliturl.length - 1];
  }

  private async getDescription(): Promise<string> {
    return await this.getElementText(".description");
  }

  private async getPricesByHDD(): Promise<PriceByHDDDTO[]> {
    const buttonHandles = await this.page.$$(".swatch");
    const pricesByHDDDTOs = [];
    for (const buttonHandle of buttonHandles) {
      const buttonIsAbled = await this.HDDButtonIsAbled(buttonHandle);
      if (buttonIsAbled) {
        const priceByHDDDTO = await this.getPriceByHDDfromButtonHandle(
          buttonHandle
        );
        pricesByHDDDTOs.push(priceByHDDDTO);
      }
    }
    return pricesByHDDDTOs;
  }

  private async HDDButtonIsAbled(
    hddButtonHandle: ElementHandle
  ): Promise<boolean> {
    const classNameHandle = await hddButtonHandle.getProperty("className");
    const className = (await classNameHandle.jsonValue()) as string;
    return !className.includes("disabled");
  }

  private async getPriceByHDDfromButtonHandle(
    buttonHandle: ElementHandle
  ): Promise<PriceByHDDDTO> {
    const HDD = await this.getTextFromElementHandle(buttonHandle);
    await buttonHandle.click();
    const price = await this.getElementText(".price");
    return new PriceByHDDDTO(HDD, price);
  }

  private async getReviewsDTOs(): Promise<ReviewsDTO> {
    const amount = await this.getReviewsAmount();
    const stars = await this.getReviewsStars();
    return new ReviewsDTO({ amount: amount, starts: stars });
  }

  private async getReviewsAmount(): Promise<number> {
    const ratings = await this.getElementText(".ratings > p");
    const amount = ratings.split(" ")[0];
    return parseInt(amount);
  }

  private async getReviewsStars(): Promise<number> {
    const elements = await this.page.$$(".glyphicon-star");
    return elements.length;
  }

  private async getElementText(selector: string): Promise<string> {
    const elementHandle = (await this.page.$(selector)) as ElementHandle;
    return await this.getTextFromElementHandle(elementHandle);
  }

  private async getTextFromElementHandle(
    elementHandle: ElementHandle
  ): Promise<string> {
    return elementHandle.evaluate(
      (element) => element.textContent,
      elementHandle
    );
  }
}
