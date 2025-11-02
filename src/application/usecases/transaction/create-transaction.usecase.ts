import TransactionRepositoryInterface from "../../../core/interfaces/transaction-repository.interface";
import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";
import ServiceRepositoryInterface from "../../../core/interfaces/service-repository.interface";
import Balance from "../../../core/valueobjects/balance";
import Transaction from "../../../core/entities/transaction";
import Type from "../../../core/enums/transaction-type.enum";

export default class CreateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepositoryInterface,
    private userRepository: UserRepositoryInterface,
    private serviceRepository: ServiceRepositoryInterface
  ) {}

  async execute(serviceCode: string, user_id: string) {
    const user = await this.userRepository.getUserById(user_id);
    const service = await this.serviceRepository.getService(serviceCode);

    if (!service) {
      throw new Error("Service atau Layanan tidak ditemukan");
    }

    const money = user?.balance ?? 0;
    const amount = service?.service_tarif ?? 0;
    const balance = new Balance(money, amount);

    if (!balance.isEnough()) {
      throw new Error("Saldo tidak cukup");
    }

    const transaction = new Transaction(
      user_id,
      Type.PAYMENT,
      service.service_tarif,
      service.id
    );

    const decreaseBalance = balance.decrease();
    transaction.generateInvoice();

    return await this.transactionRepository.create(
      transaction,
      decreaseBalance
    );
  }
}
