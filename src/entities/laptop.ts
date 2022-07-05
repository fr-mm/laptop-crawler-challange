import PriceByHDD from "valueObjects/priceByHDD";
import Reviews from "valueObjects/reviews";

interface LaptopProps {
  brand: string;
  model: string;
  screen: string;
  processor: string;
  ram: string;
  hd: string;
  os: string;
  currency: string;
  pricesByHDD: PriceByHDD[];
  reviews: Reviews;
}

export default class Laptop {
  readonly brand: string;
  readonly model: string;
  readonly screen: string;
  readonly processor: string;
  readonly ram: string;
  readonly hd: string;
  readonly os: string;
  readonly currency: string;
  readonly pricesByHDD: PriceByHDD[];
  readonly reviews: Reviews;

  constructor({
    brand,
    model,
    screen,
    processor,
    ram,
    hd,
    os,
    currency,
    pricesByHDD,
    reviews,
  }: LaptopProps) {
    this.brand = brand;
    this.model = model;
    this.screen = screen;
    this.processor = processor;
    this.ram = ram;
    this.hd = hd;
    this.os = os;
    this.currency = currency;
    this.pricesByHDD = pricesByHDD;
    this.reviews = reviews;
  }
}
