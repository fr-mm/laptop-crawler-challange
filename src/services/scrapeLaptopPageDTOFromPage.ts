import LaptopPageDTO from "dtos/LaptopPageDTO";
import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";
import { ElementHandle, Page } from "puppeteer";

export default class ScrapeLaptopPageDTOFromPage {
  public async execute(page: Page): Promise<LaptopPageDTO> {
    const description = await this.getDescription(page);
    const pricesByHDDDTOs = await this.getPricesByHDD(page);
    const reviewsDTO = await this.getReviewsDTOs(page);

    return new LaptopPageDTO({
      description: description,
      pricesByHDD: pricesByHDDDTOs,
      reviews: reviewsDTO,
    });
  }

  private async getDescription(page: Page): Promise<string> {
    return await this.getElementText(".description", page);
  }

  private async getPricesByHDD(page: Page): Promise<PriceByHDDDTO[]> {
    const buttonHandles = await page.$$(".swatch");
    const pricesByHDDDTOs = [];
    for (const buttonHandle of buttonHandles) {
      const buttonIsAbled = await this.HDDButtonIsAbled(buttonHandle);
      if (buttonIsAbled) {
        const priceByHDDDTO = await this.getPriceByHDDfromButtonHandle(
          buttonHandle,
          page
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
    buttonHandle: ElementHandle,
    page: Page
  ): Promise<PriceByHDDDTO> {
    const HDD = await this.getTextFromElementHandle(buttonHandle);
    await buttonHandle.click();
    const price = await this.getElementText(".price", page);
    return new PriceByHDDDTO(HDD, price);
  }

  private async getReviewsDTOs(page: Page): Promise<ReviewsDTO> {
    const amount = await this.getReviewsAmount(page);
    const stars = await this.getReviewsStars(page);
    return new ReviewsDTO({ amount: amount, starts: stars });
  }

  private async getReviewsAmount(page: Page): Promise<number> {
    const ratings = await this.getElementText(".ratings > p", page);
    const amount = ratings.split(" ")[0];
    return parseInt(amount);
  }

  private async getReviewsStars(page: Page): Promise<number> {
    const elements = await page.$$(".glyphicon-star");
    return elements.length;
  }

  private async getElementText(selector: string, page: Page): Promise<string> {
    const elementHandle = (await page.$(selector)) as ElementHandle;
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
