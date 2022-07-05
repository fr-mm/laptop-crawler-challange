import ParseLaptopDescriptionOutputDTO from "dtos/parseLaptopDescriptionOutputDTO";

interface ParsedBrandAndModel {
  brand: string;
  model: string;
}

export default class ParseLaptopDescriptionService {
  private readonly videoCardFlags = ["GTX"];
  private readonly networkFlags = ["4G"];
  private readonly colorFlags = ["Black"];
  private readonly defaultUnavailableField = "null";

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
      keyboard: formattedFields[8].trim(),
    });
  }

  private formatFields(fields: string[]): string[] {
    const withMergedColor = this.mergeColorInModel(fields);
    const withVideoCard = this.setVideoCard(withMergedColor);
    const withNetwork = this.setNetwork(withVideoCard);
    const withKeyboard = this.setKeyboard(withNetwork);
    return withKeyboard;
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
    if (!this.hasVideoCard(fields)) {
      fields.splice(videoCardIndex, 0, this.defaultUnavailableField);
    }
    return fields;
  }

  private hasVideoCard(fields: string[]): boolean {
    return this.hasOneOfFlagsOnIndex(this.videoCardFlags, 5, fields);
  }

  private setNetwork(fields: string[]): string[] {
    const networkIndex = 6;
    if (!this.hasNetwork(fields)) {
      fields.splice(networkIndex, 0, this.defaultUnavailableField);
    }
    return fields;
  }

  private hasNetwork(fields: string[]): boolean {
    return this.hasOneOfFlagsOnIndex(this.networkFlags, 6, fields);
  }

  private setKeyboard(fields: string[]): string[] {
    const keyboardIndex = 8;
    const hasKeyboard = fields[keyboardIndex] !== undefined;
    if (!hasKeyboard) {
      fields.push(this.defaultUnavailableField);
    }
    return fields;
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
