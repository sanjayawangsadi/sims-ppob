import TransactionRepository from "../../../infrastructures/repositories/postgres/transaction.repository";
import ServiceRepository from "../../../infrastructures/repositories/postgres/service.repository";
import UserRepository from "../../../infrastructures/repositories/postgres/user.repository";
import ShowUserUseCase from "../../../application/usecases/user/show-user.usecase";
import HistoryTransactionUseCase from "../../../application/usecases/transaction/history-transaction.usecase";
import TopUpUseCase from "../../../application/usecases/transaction/topup.usecase";
import CreateTransactionUseCase from "../../../application/usecases/transaction/create-transaction.usecase";
// import ServiceResponseDto from "../dtos/service/service-response.dto";

export default class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private userRepository: UserRepository,
    private serviceRepository: ServiceRepository
  ) {}

  async getBalance(userId: string) {
    const user = await new ShowUserUseCase(this.userRepository).execute(userId);
    return Number(user?.balance);
  }

  async getTransactionHistory(
    params: {
      limit: number;
      offset: number;
    },
    id: string
  ) {
    const historyTransactionUseCase = new HistoryTransactionUseCase(
      this.transactionRepository
    );
    const transaction =
      (await historyTransactionUseCase.execute({
        userId: id,
        limit: params.limit,
        offset: params.offset,
      })) ?? null;

    return transaction;
  }

  async topup(amount: number, userId: string) {
    const transaction = await new TopUpUseCase(
      this.transactionRepository,
      this.userRepository
    ).execute(amount, userId);

    return Number(transaction);
  }

  async create(service_code: string, userId: string) {
    const transaction = await new CreateTransactionUseCase(
      this.transactionRepository,
      this.userRepository,
      this.serviceRepository
    ).execute(service_code, userId);

    return transaction;
  }
}
