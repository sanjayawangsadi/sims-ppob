import UserService from "../services/user.service";
import { Request, Response } from "express";
import { generate } from "../../../infrastructures/configs/jwt";

export default class UserController {
  constructor(private userService: UserService) {}

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.login({
      email: email,
      password: password,
    });

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Username atau password salah",
        data: null,
      });
    }

    const token = generate(user?.id || "");
    return res.status(201).json({
      status: 201,
      message: "Login Sukses",
      data: {
        token: token,
      },
    });
  }

  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;
    const user = await this.userService.register({
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
    });

    return res.status(200).json({
      status: 200,
      message: "Registrasi sukses silakan login",
      data: null,
    });
  }

  async update(req: Request, res: Response) {
    const { first_name, last_name } = req.body;
    const userId = req.user_id ?? "";
    const user = await this.userService.updateUser(
      {
        first_name: first_name,
        last_name: last_name,
      },
      userId
    );

    return res.status(201).json({
      status: 201,
      message: "Update profile berhasil",
      data: user,
    });
  }

  async profile(req: Request, res: Response) {
    const userId = req.user_id ?? "";
    const user = await this.userService.getUser(userId);

    return res.status(200).json({
      status: 200,
      message: "Sukses",
      data: user,
    });
  }
}
