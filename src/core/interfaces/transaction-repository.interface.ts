import Transaction from "../entities/transaction";

export default interface TransactionRepositoryInterface {
  getTransactionHistory(params: {
    userId: string;
    limit: number;
    offset: number;
  }): Promise<Transaction[] | undefined>;

  create(data: Transaction, balance: number): Promise<Transaction>;

  topup(data: Transaction, balance: number): Promise<Transaction>;
}
