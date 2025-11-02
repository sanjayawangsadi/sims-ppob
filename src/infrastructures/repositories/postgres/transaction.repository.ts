import Transaction from "../../../core/entities/transaction";
import TransactionRepositoryInterface from "../../../core/interfaces/transaction-repository.interface";
import { db } from "../../configs/postgres";

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
  async getTransactionHistory(params: {
    userId: string;
    limit: number;
    offset: number;
  }): Promise<Transaction[] | undefined> {
    try {
      const transactions = await db.manyOrNone(
        `SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESCLIMIT $2 OFFSET $3`,
        [params.userId, params.limit, params.offset]
      );

      if (!transactions) return undefined;

      const formatted: Transaction[] = transactions.map(
        (transaction: any) =>
          new Transaction(
            transaction.user_id,
            transaction.transaction_type,
            transaction.total_amount,
            transaction.service_id,
            transaction.id,
            transaction.invoice_number,
            transaction.created_at
          )
      );

      return formatted;
    } catch (e) {
      console.error(e);
    }
  }

  async create(data: Transaction, balance: number): Promise<Transaction> {
    try {
      return await db.tx(async (query) => {
        const transaction = await query.one(
          `
          INSERT INTO transactions (invoice_number, user_id, service_id, transaction_type, total_amount)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, invoice_number, user_id, service_id, transaction_type, total_amount, created_at
        `,
          [
            data.invoice_number,
            data.user_id,
            data.service_id,
            data.transaction_type,
            data.total_amount,
          ]
        );

        await query.one(`UPDATE users SET balance = $1 WHERE user_id = $2`, [
          balance,
          data.user_id,
        ]);

        const formatted: Transaction = new Transaction(
          transaction.user_id,
          transaction.transaction_type,
          transaction.total_amount,
          transaction.service_id,
          transaction.id,
          transaction.invoice_number,
          transaction.created_at
        );

        return formatted;
      });
    } catch (e) {
      console.error(e);
      throw new Error("Gagal membuat transaksi");
    }
  }
}
