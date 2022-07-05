import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";

let description: string;
let parseLaptopDescriptionService: ParseLaptopDescriptionService;

beforeAll(() => {
  description =
    'Lenovo V110-15IAP, 15.6" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home';
  parseLaptopDescriptionService = new ParseLaptopDescriptionService();
});

describe("ParseLaptopDescriptionService", () => {
  describe("execute", () => {
    it("should return dto with expected brand", () => {
      const dto = parseLaptopDescriptionService.execute(description);

      const expectedBrand = "Lenovo";
      expect(dto.brand).toBe(expectedBrand);
    });

    it("should return dto with expected model", () => {
      const dto = parseLaptopDescriptionService.execute(description);

      const expectedModel = "V110-15IAP";
      expect(dto.model).toBe(expectedModel);
    });

    it("should return dto with expected screen", () => {
      const dto = parseLaptopDescriptionService.execute(description);

      const expectedScreen = '15.6" HD';
      expect(dto.screen).toBe(expectedScreen);
    });

    it("should return dto with expected processor", () => {
      const dto = parseLaptopDescriptionService.execute(description);

      const expectedProcessor = "Celeron N3350 1.1GHz";
      expect(dto.processor).toBe(expectedProcessor);
    });

    it("should return dto with expected ram", () => {
      const dto = parseLaptopDescriptionService.execute(description);

      const expectedRam = "4GB";
      expect(dto.ram).toBe(expectedRam);
    });
    it("should return dto with expected os", () => {
      const dto = parseLaptopDescriptionService.execute(description);

      const expectedOS = "Windows 10 Home";
      expect(dto.os).toBe(expectedOS);
    });
  });
});
