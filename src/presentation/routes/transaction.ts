import express from "express";

// User Modeule
import UserRepository from "../../infrastructures/repositories/postgres/user.repository";
import TransaksiRepository from "../../infrastructures/repositories/postgres/transaction.repository";
import TransaksiService from "../http/services/transaction.service";
import ServiceRepository from "../../infrastructures/repositories/postgres/service.repository";
import TransaksiController from "../http/controllers/transaction.controller";

const router = express.Router();

//  Integrete repository & service
const userRepository = new UserRepository();
const transactionRepository = new TransaksiRepository();
const serviceRepository = new ServiceRepository();
const transactionService = new TransaksiService(
  transactionRepository,
  userRepository,
  serviceRepository
);

const transactionController = new TransaksiController(transactionService);

// Routes
router.get("/balance", (req, res) => transactionController.balance(req, res));
router.post("/topup", (req, res) => transactionController.topup(req, res));
router.post("/transaction", (req, res) =>
  transactionController.create(req, res)
);
router.get("/transaction/history", (req, res) =>
  transactionController.history(req, res)
);

export default router;
