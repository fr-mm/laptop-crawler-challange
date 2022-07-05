import Reviews from "valueObjects/reviews";

interface LaptopProps {
  id: string;
  brand: string;
  model: string;
  screen: string;
  processor: string;
  ram: string;
  memory: string;
  videoCard: string | null;
  network: string | null;
  os: string;
  keyboard: string | null;
  hdd: string;
  currency: string;
  price: number;
  reviews: Reviews;
}

export default class Laptop {
  readonly id: string;
  readonly brand: string;
  readonly model: string;
  readonly screen: string;
  readonly processor: string;
  readonly ram: string;
  readonly memory: string;
  readonly videoCard: string | null;
  readonly network: string | null;
  readonly os: string;
  readonly keyboard: string | null;
  readonly hdd: string;
  readonly currency: string;
  readonly price: number;
  readonly reviews: Reviews;

  constructor({
    id,
    brand,
    model,
    screen,
    processor,
    ram,
    memory,
    videoCard,
    network,
    os,
    keyboard,
    hdd,
    currency,
    price,
    reviews,
  }: LaptopProps) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.screen = screen;
    this.processor = processor;
    this.ram = ram;
    this.memory = memory;
    this.videoCard = videoCard;
    this.network = network;
    this.os = os;
    this.keyboard = keyboard;
    this.hdd = hdd;
    this.currency = currency;
    this.price = price;
    this.reviews = reviews;
  }
}
