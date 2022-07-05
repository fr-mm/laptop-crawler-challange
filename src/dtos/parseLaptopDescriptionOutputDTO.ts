interface ParseLaptopDescriptionOutputDTOProps {
  brand: string;
  model: string;
  screen: string;
  processor: string;
  ram: string;
  hd: string;
  os: string;
}

export default class ParseLaptopDescriptionOutputDTO {
  readonly brand: string;
  readonly model: string;
  readonly screen: string;
  readonly processor: string;
  readonly ram: string;
  readonly hd: string;
  readonly os: string;

  constructor({
    brand,
    model,
    screen,
    processor,
    ram,
    hd,
    os,
  }: ParseLaptopDescriptionOutputDTOProps) {
    this.brand = brand;
    this.model = model;
    this.screen = screen;
    this.processor = processor;
    this.ram = ram;
    this.hd = hd;
    this.os = os;
  }
}
