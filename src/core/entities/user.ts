import bcrypt from "bcryptjs";
import { app_rounds } from "../../infrastructures/configs/app";
export default class User {
  constructor(
    public email: string,
    public password: string,
    public first_name?: string,
    public last_name?: string,
    public profile_image?: string,
    public balance?: number,
    public created_at?: string,
    public updated_at?: string,
    public id?: string
  ) {}

  // Check whether or not email match the format
  isEmailValid(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  // Check whether or not password is 8 character
  isPasswordValid() {
    return this.password.length >= 8;
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt(app_rounds);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(this.password, password);
  }
}
