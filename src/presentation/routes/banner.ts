import express from "express";
import BannerRepository from "../../infrastructures/repositories/postgres/banner.repository";
import BannerService from "../http/services/banner.service";
import BannerController from "../http/controllers/banner.controller";

const router = express.Router();

const bannerRepository = new BannerRepository();
const bannerService = new BannerService(bannerRepository);
const bannerController = new BannerController(bannerService);

router.get("/", (req, res) => bannerController.index(req, res));

export default router;
