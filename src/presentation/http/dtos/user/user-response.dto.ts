export default class UserResponseDto {
  constructor(
    public email: string,
    public first_name: string,
    public last_name: string,
    public profile_image: string
  ) {}

  static fromEntity(user: any): UserResponseDto {
    return new UserResponseDto(
      user.email,
      user.first_name,
      user.last_name,
      user.profile_image
    );
  }
}
