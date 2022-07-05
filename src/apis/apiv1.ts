import Express from "express";
import cors from "cors";
import GetLaptopsByBrandSortedByAscendingPriceService from "services/getLaptopsByBrandSortedByAscendingPriceService";
import LaptopBrandEnum from "enums/laptopBrandEnum";
import { Server } from "http";

export default class APIv1 {
  readonly app: Express.Application;
  private readonly hostname: string;
  private readonly port: string;
  private server: Server | undefined;

  constructor(
    private readonly getLaptopsByBrandSortedByAscendingPriceService: GetLaptopsByBrandSortedByAscendingPriceService
  ) {
    this.app = Express();
    this.hostname = process.env.HOSTNAME || "http://localhost";
    this.port = process.env.PORT || "4000";
    this.server = undefined;
  }

  public start(): void {
    this.setCors();
    this.setRoutes();
    this.startServer();
  }

  public stop(): void {
    if (this.server instanceof Server) {
      this.server.close();
    }
  }

  private setCors(): void {
    this.app.use(
      cors({
        origin: ["http://localhost:3000"],
      })
    );
  }

  private setRoutes(): void {
    this.app.get("/", (req: Express.Request, res: Express.Response) => {
      res.send("Rotas disponíveis: /lenovo");
    });

    this.app.get(
      "/lenovo",
      async (req: Express.Request, res: Express.Response) => {
        const laptops =
          await this.getLaptopsByBrandSortedByAscendingPriceService.execute(
            LaptopBrandEnum.LENOVO
          );
        res.statusCode = 200;
        res.json(laptops);
      }
    );
  }

  private startServer(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`Servidor rodando em ${this.hostname}:${this.port}`);
    });
  }
}
