import User from "../../../core/entities/user";
import UserRepositoryInterface from "../../../core/interfaces/user-repository.interface";
import { db } from "../../configs/postgres";

export default class UserRepository implements UserRepositoryInterface {
  async getUserById(id: string): Promise<User | undefined> {
    try {
      const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [
        id,
      ]);

      if (!user) return undefined;

      const formatted: User = new User(
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.profile_image,
        user.balance,
        user.created_at,
        user.updated_at,
        user.id
      );

      return formatted;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (!user) return undefined;

      const formatted: User = new User(
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.profile_image,
        user.balance,
        user.created_at,
        user.updated_at,
        user.id
      );

      return formatted;
    } catch (e) {
      console.error(e);
    }
  }

  async create(data: User): Promise<User> {
    try {
      return await db.tx(async (query) => {
        const user = await query.one(
          `         
          INSERT INTO users (first_name, last_name, email, password, created_at)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, first_name, last_name, email, password
          `,
          [
            data.first_name,
            data.last_name,
            data.email,
            data.password,
            new Date,
          ]
        );

        const formatted: User = new User(
          user.email,
          user.password,
          user.first_name,
          user.last_name
        );

        return formatted;
      });
    } catch (e) {
      console.error(e);
      throw new Error("Gagal membuat user");
    }
  }

  async update(
    data: { first_name: string; last_name: string },
    id: string
  ): Promise<User> {
    try {
      return await db.tx(async (query) => {
        const user = await query.one(
          `         
          UPDATE users SET 
            first_name = $1, 
            last_name = $2, 
            updated_at = $3
          WHERE id = $4
          RETURNING id, first_name, last_name, email, password
          `,
          [data.first_name, data.last_name, new Date, id]
        );

        const formatted: User = new User(
          user.email,
          user.password,
          user.first_name,
          user.last_name
        );

        return formatted;
      });
    } catch (e) {
      console.error(e);
      throw new Error("Gagal membuat user");
    }
  }
}
