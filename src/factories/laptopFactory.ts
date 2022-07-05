import LaptopPageDTO from "dtos/LaptopPageDTO";
import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";
import Laptop from "entities/laptop";
import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";
import PriceByHDD from "valueObjects/priceByHDD";
import Reviews from "valueObjects/reviews";

export default class LaptopFactory {
  constructor(
    private readonly parseLaptopDescriptionService: ParseLaptopDescriptionService
  ) {}

  public buildFromLaptopPageDTO(laptopPageDTO: LaptopPageDTO): Laptop {
    const descriptionDTO = this.parseLaptopDescriptionService.execute(
      laptopPageDTO.description
    );
    const currency = this.getCurrency(laptopPageDTO.pricesByHDD);
    const pricesByHDD = this.getPricesByHDD(
      laptopPageDTO.pricesByHDD,
      currency
    );
    const reviews = this.getReviews(laptopPageDTO.reviews);

    return new Laptop({
      brand: descriptionDTO.brand,
      model: descriptionDTO.model,
      screen: descriptionDTO.screen,
      processor: descriptionDTO.processor,
      ram: descriptionDTO.ram,
      hd: descriptionDTO.hd,
      os: descriptionDTO.os,
      currency: currency,
      pricesByHDD: pricesByHDD,
      reviews: reviews,
    });
  }

  private getCurrency(pricesByHDDDTO: PriceByHDDDTO[]): string {
    const sample = pricesByHDDDTO[0];
    const currencyLength = this.getCurrencyLength(sample.price);
    return sample.price.slice(0, currencyLength + 1);
  }

  private getCurrencyLength(priceWithCurrency: string): number {
    let currencyLength = 0;
    for (const char of priceWithCurrency) {
      const charIsNumber = isNaN(parseInt(char));
      if (!charIsNumber) {
        currencyLength++;
      } else {
        break;
      }
    }
    return currencyLength;
  }

  private getPricesByHDD(
    pricesByHDDDTO: PriceByHDDDTO[],
    currency: string
  ): PriceByHDD[] {
    const pricesByHDD = [];

    for (const priceByHDDDTO of pricesByHDDDTO) {
      const price = this.parsePrice(priceByHDDDTO.price, currency);
      const priceByHDD = new PriceByHDD(priceByHDDDTO.HDD, price);
      pricesByHDD.push(priceByHDD);
    }
    return pricesByHDD;
  }

  private parsePrice(rawPrice: string, currency: string): number {
    const priceWithoutCurrency = rawPrice.replace(currency, "");
    return parseFloat(priceWithoutCurrency);
  }

  private getReviews(reviewsDTO: ReviewsDTO): Reviews {
    return new Reviews({
      amount: reviewsDTO.amount,
      stars: reviewsDTO.starts,
    });
  }
}
