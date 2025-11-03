import TransactionRepositoryInterface from "../../../core/interfaces/transaction-repository.interface";
import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";
import Balance from "../../../core/valueobjects/balance";
import Transaction from "../../../core/entities/transaction";
import Type from "../../../core/enums/transaction-type.enum";

export default class HistoryTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepositoryInterface,
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(amount: number, user_id: string) {
    const user = await this.userRepository.getUserById(user_id);
    const money = Number(user?.balance) ?? 0;
    const balance = new Balance(money, amount);

    let increaseBalance = balance.increase();
    const transaction = new Transaction(user_id, Type.TOPUP, amount);

    transaction.generateInvoice();

    return await this.transactionRepository.topup(transaction, increaseBalance);
  }
}
