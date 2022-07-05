import PriceByHDDDTO from "dtos/priceByHDDDTO";
import ReviewsDTO from "dtos/reviewsDTO";

interface LaptopPageDTOProps {
  id: string;
  name: string;
  description: string;
  pricesByHDD: PriceByHDDDTO[];
  reviews: ReviewsDTO;
}

export default class LaptopPageDTO {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly pricesByHDD: PriceByHDDDTO[];
  readonly reviews: ReviewsDTO;

  constructor({
    id,
    name,
    description,
    pricesByHDD,
    reviews,
  }: LaptopPageDTOProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pricesByHDD = pricesByHDD;
    this.reviews = reviews;
  }
}
