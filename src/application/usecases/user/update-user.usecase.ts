import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";

export default class ShowUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(params: { first_name: string; last_name: string }, id: string) {
    return await this.userRepository.update(params, id);
  }
}
