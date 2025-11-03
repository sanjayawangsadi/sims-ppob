import express from "express";

// User Modeule
import UserRepository from "../../infrastructures/repositories/postgres/user.repository";
import UserService from "../http/services/user.service";
import UserController from "../http/controllers/user.controller";

// Banner Module
import BannerRepository from "../../infrastructures/repositories/postgres/banner.repository";
import BannerService from "../http/services/banner.service";
import BannerController from "../http/controllers/banner.controller";

// Service Module
import ServiceRepository from "../../infrastructures/repositories/postgres/service.repository";
import ServiceService from "../http/services/service.service";
import ServiceController from "../http/controllers/service.controller";

const router = express.Router();

//  Integrete repository & service
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const bannerRepository = new BannerRepository();
const bannerService = new BannerService(bannerRepository);
const bannerController = new BannerController(bannerService);

const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository);
const serviceController = new ServiceController(serviceService);

// Routes
router.post("/login", (req, res) => userController.authenticate(req, res));
router.post("/register", (req, res) => userController.create(req, res));
router.get("/banner", (req, res) => bannerController.index(req, res));
router.get("/services", (req, res) => serviceController.index(req, res));

export default router;
