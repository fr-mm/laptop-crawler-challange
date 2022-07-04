import PriceByHDD from "valueObjects/priceByHDD";
import Reviews from "valueObjects/reviews";

interface LaptopProps {
  brand: string;
  model: string;
  screen: string;
  processor: string;
  ram: string;
  os: string;
  pricesByHDD: PriceByHDD[];
  reviews: Reviews;
}

export default class Laptop {
  readonly brand: string;
  readonly model: string;
  readonly screen: string;
  readonly processor: string;
  readonly ram: string;
  readonly os: string;
  readonly pricesByHDD: PriceByHDD[];
  readonly reviews: Reviews;

  constructor({
    brand,
    model,
    screen,
    processor,
    ram,
    os,
    pricesByHDD,
    reviews,
  }: LaptopProps) {
    this.brand = brand;
    this.model = model;
    this.screen = screen;
    this.processor = processor;
    this.ram = ram;
    this.os = os;
    this.pricesByHDD = pricesByHDD;
    this.reviews = reviews;
  }
}
