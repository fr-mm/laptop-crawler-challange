interface ParseLaptopDescriptionOutputDTOProps {
  brand: string;
  model: string;
  screen: string;
  processor: string;
  ram: string;
  memory: string;
  os: string;
}

export default class ParseLaptopDescriptionOutputDTO {
  readonly brand: string;
  readonly model: string;
  readonly screen: string;
  readonly processor: string;
  readonly ram: string;
  readonly memory: string;
  readonly os: string;

  constructor({
    brand,
    model,
    screen,
    processor,
    ram,
    memory: memory,
    os,
  }: ParseLaptopDescriptionOutputDTOProps) {
    this.brand = brand;
    this.model = model;
    this.screen = screen;
    this.processor = processor;
    this.ram = ram;
    this.memory = memory;
    this.os = os;
  }
}
