import express from "express";
import ServiceRepository from "../../infrastructures/repositories/postgres/service.repository";
import ServiceService from "../http/services/service.service";
import ServiceController from "../http/controllers/service.controller";

const router = express.Router();

const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository);
const serviceController = new ServiceController(serviceService);

router.get("/", (req, res) => serviceController.index(req, res));

export default router;
