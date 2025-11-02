import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";

export default class ShowUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: string) {
    return await this.userRepository.getUserById(id);
  }
}
