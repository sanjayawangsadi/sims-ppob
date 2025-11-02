import ServiceService from "../services/service.service";
import { Request, Response } from "express";

export default class ServiceController {
  constructor(private serviceService: ServiceService) {}

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const services = await this.serviceService.getServices();
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: services,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
