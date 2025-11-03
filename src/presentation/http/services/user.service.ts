import UserRepository from "../../../infrastructures/repositories/postgres/user.repository";
import RegisterUserUseCase from "../../../application/usecases/user/register-user.usecase";
import LoginUseCase from "../../../application/usecases/user/login.usecase";
import ShowUserUseCase from "../../../application/usecases/user/show-user.usecase";
import UpdateUserUseCase from "../../../application/usecases/user/update-user.usecase";
import UserResponseDto from "../dtos/user/user-response.dto";

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async login(params: { email: string; password: string }) {
    return await new LoginUseCase(this.userRepository).execute(params);
  }

  async register(params: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) {
    return await new RegisterUserUseCase(this.userRepository).execute(params);
  }

  async getUser(id: string) {
    const user = await new ShowUserUseCase(this.userRepository).execute(id);
    return UserResponseDto.fromEntity(user);
  }

  async updateUser(
    params: { first_name: string; last_name: string },
    id: string
  ) {
    const user = await new UpdateUserUseCase(this.userRepository).execute(
      params,
      id
    );
    return UserResponseDto.fromEntity(user);
  }
}
