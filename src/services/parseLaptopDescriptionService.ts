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
      screen: this.parseFieldWithEscapedQuotes(fields[1]),
      processor: this.parseFieldWithEscapedQuotes(fields[2]),
      ram: fields[3].trim(),
      memory: fields[4].trim(),
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

  private parseFieldWithEscapedQuotes(rawScreen: string): string {
    const escaped = rawScreen.replace('"', '\\"');
    return escaped.trim();
  }
}
