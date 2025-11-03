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
      let query = `
        SELECT 
          transactions.invoice_number,
          transactions.transaction_type,
          (CASE 
            WHEN transactions.transaction_type = 'TOPUP' 
              THEN 'Top Up balance' 
            ELSE services.service_name
          END) AS description,
          transactions.total_amount,
          transactions.created_at AS created_on
        FROM 
          transactions 
        LEFT JOIN services 
          ON transactions.service_id = services.id
        WHERE 
          transactions.user_id = $1 
        ORDER BY 
          transactions.created_at DESC
        `;

      let values: any[] = [params.userId];

      if (params.limit && params.offset) {
        query += `
          LIMIT $2 
          OFFSET $3
        `;
        values.push(params.limit, params.offset);
      }

      const transactions = await db.manyOrNone(query, values);

      if (!transactions) return undefined;

      return transactions;
    } catch (e) {
      console.error(e);
    }
  }

  async create(data: Transaction, balance: number): Promise<Transaction> {
    try {
      return await db.tx(async (query) => {
        const transaction = await query.one(
          `
          INSERT INTO transactions (invoice_number, user_id, service_id, transaction_type, total_amount, created_at)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        `,
          [
            data.invoice_number,
            data.user_id,
            data.service_id,
            data.transaction_type,
            data.total_amount,
            new Date(),
          ]
        );

        await query.none(`UPDATE users SET balance = $1 WHERE id = $2`, [
          balance,
          data.user_id,
        ]);

        const createdTransaction = await query.one(
          `
          SELECT 
            transactions.invoice_number,
            services.service_code,
            services.service_name,
            transactions.transaction_type,
            transactions.total_amount,
            transactions.created_at AS created_on
          FROM 
            transactions
          JOIN services 
            on transactions.service_id = services.id
          WHERE 
            transactions.id = $1
        `,
          [transaction.id]
        );

        return createdTransaction;
      });
    } catch (e) {
      console.error(e);
      throw new Error("Gagal membuat transaksi");
    }
  }

  async topup(data: Transaction, balance: number): Promise<Transaction> {
    try {
      return await db.tx(async (query) => {
        await query.one(
          `
          INSERT INTO transactions (invoice_number, user_id, service_id, transaction_type, total_amount, created_at)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, invoice_number, user_id, service_id, transaction_type, total_amount, created_at
        `,
          [
            data.invoice_number,
            data.user_id,
            data.service_id,
            data.transaction_type,
            data.total_amount,
            new Date(),
          ]
        );

        const userBalance = await query.one(
          `
          UPDATE users SET balance = $1 WHERE id = $2
          RETURNING balance
        `,
          [balance, data.user_id]
        );

        return userBalance.balance;
      });
    } catch (e) {
      console.error(e);
      throw new Error("Gagal membuat transaksi");
    }
  }
}
