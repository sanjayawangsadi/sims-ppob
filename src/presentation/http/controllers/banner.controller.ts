import BannerService from "../services/banner.service";
import { Request, Response } from "express";

export default class BannerController {
  constructor(private bannerService: BannerService) {}

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const banners = await this.bannerService.getBanners();
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: banners,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
