import User from "../entities/user";

export default interface UserRepositoryInterface {
  getUserById(id: string): Promise<User | undefined>;

  getUserByEmail(email: string): Promise<User | undefined>;

  create(data: User): Promise<User>;

  update(
    data: { first_name: string; last_name: string },
    id: string
  ): Promise<User>;

  // updateImage(path: string, id: string): Promise<Object>;
}
