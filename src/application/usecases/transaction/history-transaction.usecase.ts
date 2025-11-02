import TransactionRepositoryInterface from "../../../core/interfaces/transaction-repository.interface";

export default class HistoryTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(params: { userId: string; limit: number; offset: number }) {
    return await this.transactionRepository.getTransactionHistory(params);
  }
}
