import LaptopPageDTO from "dtos/LaptopPageDTO";
import Laptop from "entities/laptop";
import LaptopBrandEnum from "enums/laptopBrandEnum";
import URLEnum from "enums/urlEnum";
import LaptopsFactory from "factories/laptopsFactory";
import GetLaptopPagesURLsByBrandService from "./getLaptopPagesURLsByBrandService";
import ScrapeLaptopPageDTOFromURLService from "./scrapeLaptopPageDTOFromURLService";
import SortLaptopsByAscendingPriceService from "./sortLaptopsByAscendingPriceService";

interface GetLaptopsByBrandSortedByAscendingPriceServiceProps {
  laptopFactory: LaptopsFactory;
  getLaptopPagesURLsByBrandService: GetLaptopPagesURLsByBrandService;
  scrapeLaptopPageDTOFromURLService: ScrapeLaptopPageDTOFromURLService;
  sortLaptopsByAscendingPriceService: SortLaptopsByAscendingPriceService;
}

export default class GetLaptopsByBrandSortedByAscendingPriceService {
  private readonly laptopFactory: LaptopsFactory;
  private readonly getLaptopPagesURLsByBrandService: GetLaptopPagesURLsByBrandService;
  private readonly scrapeLaptopPageDTOFromURLService: ScrapeLaptopPageDTOFromURLService;
  private readonly sortLaptopsByAscendingPriceService: SortLaptopsByAscendingPriceService;

  constructor({
    laptopFactory,
    getLaptopPagesURLsByBrandService,
    scrapeLaptopPageDTOFromURLService,
    sortLaptopsByAscendingPriceService,
  }: GetLaptopsByBrandSortedByAscendingPriceServiceProps) {
    this.laptopFactory = laptopFactory;
    this.getLaptopPagesURLsByBrandService = getLaptopPagesURLsByBrandService;
    this.scrapeLaptopPageDTOFromURLService = scrapeLaptopPageDTOFromURLService;
    this.sortLaptopsByAscendingPriceService =
      sortLaptopsByAscendingPriceService;
  }

  public async execute(brand: LaptopBrandEnum): Promise<Laptop[]> {
    const urls = await this.getLaptopPagesURLsByBrandService.execute(
      brand,
      URLEnum.laptops
    );
    const laptopPageDTOs = await this.scrapeAllURLs(urls);
    const unsortedLaptops = await this.buildLaptops(laptopPageDTOs);
    return this.sortLaptopsByAscendingPriceService.execute(unsortedLaptops);
  }

  private async scrapeAllURLs(urls: string[]): Promise<LaptopPageDTO[]> {
    const laptopPageDTOs: LaptopPageDTO[] = [];
    for (const url of urls) {
      const laptopPageDTO =
        await this.scrapeLaptopPageDTOFromURLService.execute(url);
      laptopPageDTOs.push(laptopPageDTO);
    }
    return laptopPageDTOs;
  }

  private async buildLaptops(
    laptopPageDTOs: LaptopPageDTO[]
  ): Promise<Laptop[]> {
    let laptops: Laptop[] = [];

    for (const laptopPageDTO of laptopPageDTOs) {
      const pageLaptops =
        this.laptopFactory.buildFromLaptopPageDTO(laptopPageDTO);
      laptops = laptops.concat(pageLaptops);
    }

    return laptops;
  }
}
