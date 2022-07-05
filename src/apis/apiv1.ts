import Express from "express";
import cors from "cors";
import GetLaptopsByBrandSortedByAscendingPriceService from "services/getLaptopsByBrandSortedByAscendingPriceService";
import LaptopBrandEnum from "enums/laptopBrandEnum";

export default class APIv1 {
  private readonly api: Express.Application;
  private readonly hostname: string;
  private readonly port: string;

  constructor(
    private readonly getLaptopsByBrandSortedByAscendingPriceService: GetLaptopsByBrandSortedByAscendingPriceService
  ) {
    this.api = Express();
    this.hostname = process.env.HOSTNAME || "http://localhost";
    this.port = process.env.PORT || "4000";
  }

  public start(): void {
    this.setCors();
    this.setRoutes();
    this.startServer();
  }

  private setCors(): void {
    this.api.use(
      cors({
        origin: ["http://localhost:3000"],
      })
    );
  }

  private setRoutes(): void {
    this.api.get("/", (req: Express.Request, res: Express.Response) => {
      res.send("Rotas disponíveis: /lenovo");
    });

    this.api.get(
      "/lenovo",
      async (req: Express.Request, res: Express.Response) => {
        const laptops =
          await this.getLaptopsByBrandSortedByAscendingPriceService.execute(
            LaptopBrandEnum.LENOVO
          );
        res.status(200).json(laptops);
        res.send();
      }
    );
  }

  private startServer(): void {
    this.api.listen(this.port, () => {
      console.log(`Servidor rodando em ${this.hostname}:${this.port}`);
    });
  }
}
