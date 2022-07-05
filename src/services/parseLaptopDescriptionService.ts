import ParseLaptopDescriptionOutputDTO from "dtos/parseLaptopDescriptionOutputDTO";

interface ParsedBrandAndModel {
  brand: string;
  model: string;
}

export default class ParseLaptopDescriptionService {
  public execute(description: string): ParseLaptopDescriptionOutputDTO {
    const fields = description.split(",");
    const brandAndModel = fields[0];
    const parseBrandAndModel = this.parseBrandAndModel(brandAndModel);

    return new ParseLaptopDescriptionOutputDTO({
      brand: parseBrandAndModel.brand.trim(),
      model: parseBrandAndModel.model.trim(),
      screen: `${fields[1].trim()}`,
      processor: fields[2].trim(),
      ram: fields[3].trim(),
      hd: fields[4].trim(),
      os: fields[5].trim(),
    });
  }
  private parseBrandAndModel(brandAndModel: string): ParsedBrandAndModel {
    const splitted = brandAndModel.split(" ");
    return {
      brand: splitted[0],
      model: splitted.slice(1).join(" "),
    };
  }
}
