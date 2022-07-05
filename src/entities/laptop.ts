import PriceByHDD from "valueObjects/priceByHDD";
import Reviews from "valueObjects/reviews";

interface LaptopProps {
  brand: string;
  model: string;
  screen: string;
  processor: string;
  ram: string;
  memory: string;
  os: string;
  hdd: string;
  currency: string;
  price: number;
  reviews: Reviews;
}

export default class Laptop {
  readonly brand: string;
  readonly model: string;
  readonly screen: string;
  readonly processor: string;
  readonly ram: string;
  readonly memory: string;
  readonly os: string;
  readonly hdd: string;
  readonly currency: string;
  readonly price: number;
  readonly reviews: Reviews;

  constructor({
    brand,
    model,
    screen,
    processor,
    ram,
    memory: memory,
    os,
    hdd: hdd,
    currency,
    price,
    reviews,
  }: LaptopProps) {
    this.brand = brand;
    this.model = model;
    this.screen = screen;
    this.processor = processor;
    this.ram = ram;
    this.memory = memory;
    this.os = os;
    this.hdd = hdd;
    this.currency = currency;
    this.price = price;
    this.reviews = reviews;
  }
}
