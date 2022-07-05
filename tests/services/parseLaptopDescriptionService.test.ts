import ParseLaptopDescriptionService from "services/parseLaptopDescriptionService";

let defaultDescription: string;
let parseLaptopDescriptionService: ParseLaptopDescriptionService;

beforeAll(() => {
  defaultDescription =
    'Lenovo V110-15IAP, 15.6" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home';
  parseLaptopDescriptionService = new ParseLaptopDescriptionService();
});

describe("ParseLaptopDescriptionService", () => {
  describe("execute", () => {
    it("should return dto with expected brand", () => {
      const dto = parseLaptopDescriptionService.execute(defaultDescription);

      const expectedBrand = "Lenovo";
      expect(dto.brand).toBe(expectedBrand);
    });

    it("should return dto with expected model", () => {
      const dto = parseLaptopDescriptionService.execute(defaultDescription);

      const expectedModel = "V110-15IAP";
      expect(dto.model).toBe(expectedModel);
    });

    it("should return dto with expected screen", () => {
      const dto = parseLaptopDescriptionService.execute(defaultDescription);

      const expectedScreen = '15.6\\" HD';
      expect(dto.screen).toBe(expectedScreen);
    });

    it("should return dto with expected processor", () => {
      const dto = parseLaptopDescriptionService.execute(defaultDescription);

      const expectedProcessor = "Celeron N3350 1.1GHz";
      expect(dto.processor).toBe(expectedProcessor);
    });

    it("should return dto with expected ram", () => {
      const dto = parseLaptopDescriptionService.execute(defaultDescription);

      const expectedRam = "4GB";
      expect(dto.ram).toBe(expectedRam);
    });
    it("should return dto with expected os", () => {
      const dto = parseLaptopDescriptionService.execute(defaultDescription);

      const expectedOS = "Windows 10 Home";
      expect(dto.os).toBe(expectedOS);
    });

    describe("when color exists separated by comma", () => {
      it("should merge color in model", () => {
        const description =
          'Lenovo Legion Y520-15IKBM, Black, 15.6" FHD IPS, Core i5-7300HQ, 8 GB, 128GB SSD + 2 TB HDD, NVIDIA GeForce GTX 1060 6 GB, FreeDOS + Windows 10 Home';

        const dto = parseLaptopDescriptionService.execute(description);

        const expectedModel = "Legion Y520-15IKBM Black";
        expect(dto.model).toBe(expectedModel);
      });

      it("should preserve screen", () => {
        const description =
          'Lenovo Legion Y520-15IKBM, Black, 15.6" FHD IPS, Core i5-7300HQ, 8 GB, 128GB SSD + 2 TB HDD, NVIDIA GeForce GTX 1060 6 GB, FreeDOS + Windows 10 Home';

        const dto = parseLaptopDescriptionService.execute(description);

        const expectedScreen = '15.6\\" FHD IPS';
        expect(dto.screen).toBe(expectedScreen);
      });
    });

    describe("when videoCard is not present", () => {
      it("should return dto with expected videoCard", () => {
        const dto = parseLaptopDescriptionService.execute(defaultDescription);

        const expectedVideoCard = "null";
        expect(dto.videoCard).toBe(expectedVideoCard);
      });
    });

    describe("when videoCard is present", () => {
      const description =
        'Lenovo Legion Y720, 15.6" FHD IPS, Core i7-7700HQ, 8GB, 128GB SSD + 2TB HDD, GeForce GTX 1060 6GB, DOS, RGB backlit keyboard';
      it("should return dto with expected videoCard", () => {
        const dto = parseLaptopDescriptionService.execute(description);

        const expectedVideoCard = "GeForce GTX 1060 6GB";
        expect(dto.videoCard).toBe(expectedVideoCard);
      });

      it("should preserve os", () => {
        const dto = parseLaptopDescriptionService.execute(description);

        const expectedOS = "DOS";
        expect(dto.os).toBe(expectedOS);
      });
    });

    describe("when network is not present", () => {
      it("should return dto with expected network", () => {
        const dto = parseLaptopDescriptionService.execute(defaultDescription);

        const expectedNetwork = "null";
        expect(dto.network).toBe(expectedNetwork);
      });
    });

    describe("when network is present", () => {
      const description =
        'Lenovo ThinkPad Yoga 370 Black, 13.3" FHD IPS Touch, Core i5-7200U, 8GB, 256GB SSD, 4G, Windows 10 Pro';
      it("should return dto with expected network", () => {
        const dto = parseLaptopDescriptionService.execute(description);

        const expectedNetwork = "4G";
        expect(dto.network).toBe(expectedNetwork);
      });

      it("should preserve os", () => {
        const dto = parseLaptopDescriptionService.execute(description);

        const expectedOS = "Windows 10 Pro";
        expect(dto.os).toBe(expectedOS);
      });
    });
  });
});
