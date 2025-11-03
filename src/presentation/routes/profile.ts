import express from "express";

// User Modeule
import UserRepository from "../../infrastructures/repositories/postgres/user.repository";
import UserService from "../http/services/user.service";
import UserController from "../http/controllers/user.controller";

const router = express.Router();

//  Integrete repository & service
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
router.get("/", (req, res) => userController.profile(req, res));
router.put("/update", (req, res) => userController.update(req, res));

export default router;
