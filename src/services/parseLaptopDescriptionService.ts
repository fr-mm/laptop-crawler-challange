import ParseLaptopDescriptionOutputDTO from "dtos/parseLaptopDescriptionOutputDTO";
import LaptopColorEnum from "enums/laptopColorEnum";

interface ParsedBrandAndModel {
  brand: string;
  model: string;
}

export default class ParseLaptopDescriptionService {
  private readonly videoCardFlags = ["GTX"];
  private readonly networkFlags = ["4G"];
  private readonly colorFlags = ["Black"];

  public execute(description: string): ParseLaptopDescriptionOutputDTO {
    const fields = description.split(",");
    const formattedFields = this.formatFields(fields);
    const brandAndModel = formattedFields[0];
    const parseBrandAndModel = this.parseBrandAndModel(brandAndModel);

    return new ParseLaptopDescriptionOutputDTO({
      brand: parseBrandAndModel.brand.trim(),
      model: parseBrandAndModel.model.trim(),
      screen: this.parseFieldWithEscapedQuotes(formattedFields[1]),
      processor: this.parseFieldWithEscapedQuotes(formattedFields[2]),
      ram: formattedFields[3].trim(),
      memory: formattedFields[4].trim(),
      videoCard: formattedFields[5].trim(),
      network: formattedFields[6].trim(),
      os: formattedFields[7].trim(),
    });
  }

  private formatFields(fields: string[]): string[] {
    const withMergedColor = this.mergeColorInModel(fields);
    const withVideoCard = this.setVideoCard(withMergedColor);
    const withNetwork = this.setNetwork(withVideoCard);
    return withNetwork;
  }

  private mergeColorInModel(fields: string[]): string[] {
    const colorIndex = 1;
    if (this.hasOneOfFlagsOnIndex(this.colorFlags, colorIndex, fields)) {
      fields[colorIndex - 1] += fields[colorIndex];
      fields.splice(colorIndex, 1);
    }
    return fields;
  }

  private setVideoCard(fields: string[]): string[] {
    const videoCardIndex = 5;
    const defaultVideoCard = "null";
    if (!this.hasVideoCard(fields)) {
      fields.splice(videoCardIndex, 0, defaultVideoCard);
    }
    return fields;
  }

  private hasVideoCard(fields: string[]): boolean {
    return this.hasOneOfFlagsOnIndex(this.videoCardFlags, 5, fields);
  }

  private setNetwork(fields: string[]): string[] {
    const networkIndex = 6;
    const defaultNetwork = "null";
    if (!this.hasNetwork(fields)) {
      fields.splice(networkIndex, 0, defaultNetwork);
    }
    return fields;
  }

  private hasNetwork(fields: string[]): boolean {
    return this.hasOneOfFlagsOnIndex(this.networkFlags, 6, fields);
  }

  private hasOneOfFlagsOnIndex(
    flags: string[],
    index: number,
    fields: string[]
  ): boolean {
    const field = fields[index];
    for (const flag of flags) {
      if (field.includes(flag)) {
        return true;
      }
    }
    return false;
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
