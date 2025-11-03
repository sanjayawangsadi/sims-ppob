import { Request, Response, NextFunction } from "express";
import { decode } from "../../infrastructures/configs/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: 401,
      message: "Token tidak valid atau kadaluarsa",
      data: null,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = decode(token) as { id: string };
    (req as any).user_id = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Token tidak valid atau kadaluarsa",
      data: null,
    });
  }
};
