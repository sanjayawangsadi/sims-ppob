import TransactionService from "../services/transaction.service";
import { Request, Response } from "express";

export default class TransactionController {
  constructor(private transactionService: TransactionService) {}

  async balance(req: Request, res: Response) {
    const userId = req.user_id ?? "";
    const transaction = await this.transactionService.getBalance(userId);

    return res.status(200).json({
      status: 200,
      message: "Get balance berhasil",
      data: {
        balance: transaction,
      },
    });
  }

  async history(req: Request, res: Response) {
    const userId = req.user_id ?? "";
    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;

    const transactions = await this.transactionService.getTransactionHistory(
      {
        limit: Number(limit),
        offset: Number(offset),
      },
      userId
    );

    return res.status(200).json({
      status: 200,
      message: "Get History Berhasil",
      data: {
        offset: offset,
        limit: limit,
        records: transactions,
      },
    });
  }

  async topup(req: Request, res: Response) {
    const userId = req.user_id ?? "";
    const { top_up_amount } = req.body;
    const transaction = await this.transactionService.topup(
      top_up_amount,
      userId
    );

    return res.status(201).json({
      status: 201,
      message: "Topup balance berhasil",
      data: {
        balance: transaction,
      },
    });
  }

  async create(req: Request, res: Response) {
    const userId = req.user_id ?? "";
    const { service_code } = req.body;

    const transaction = await this.transactionService.create(
      service_code,
      userId
    );

    return res.status(200).json({
      status: 201,
      message: "Transaksi Berhasil",
      data: transaction,
    });
  }
}
