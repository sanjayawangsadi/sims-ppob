import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";
import User from "../../../core/entities/user";

export default class LoginUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(params: { email: string; password: string }) {
    const user = new User(params.email, params.password);

    // Check whether the given email is valid
    if (user.isEmailValid()) {
      throw new Error("Parameter email tidak sesuai dengan format");
    }

    // Check whether the user email already exist in the database
    const userDoesExist = await this.userRepository.getUserByEmail(
      params.email
    );

    if (!userDoesExist) {
      throw new Error("email atau password salah");
    }

    return userDoesExist;
  }
}
