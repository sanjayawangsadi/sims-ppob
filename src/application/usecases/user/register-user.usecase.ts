import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";
import User from "../../../core/entities/user";

export default class RegisterUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(params: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) {
    const user = new User(
      params.email,
      params.password,
      params.first_name,
      params.last_name
    );

    // Check whether the given email is valid
    if (user.isEmailValid()) {
      throw new Error("Parameter email tidak sesuai dengan format");
    }

    // Check whether given the given password follows 8 character
    if (user.isPasswordValid()) {
      throw new Error("Password minimal 8 character");
    }

    // Check whether the given array already exist in the database
    const doesExist = await this.userRepository.getUserByEmail(params.email);
    if (doesExist) {
      throw new Error("Email sudah terdaftar");
    }

    return this.userRepository.create(user);
  }
}
