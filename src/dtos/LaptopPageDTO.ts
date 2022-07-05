import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";

interface LaptopPageDTOProps {
  description: string;
  pricesByHDD: PriceByHDDDTO[];
  reviews: ReviewsDTO;
}

export default class LaptopPageDTO {
  readonly description: string;
  readonly pricesByHDD: PriceByHDDDTO[];
  readonly reviews: ReviewsDTO;

  constructor({ description, pricesByHDD, reviews }: LaptopPageDTOProps) {
    this.description = description;
    this.pricesByHDD = pricesByHDD;
    this.reviews = reviews;
  }
}
