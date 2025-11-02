export default class BannerResponseDto {
  constructor(
    public banner_name: string,
    public banner_image: string,
    public description: string,
  ) {}

  static fromEntity(banner: any): BannerResponseDto {
    return new BannerResponseDto(
      banner.banner_name,
      banner.banner_image,
      banner.description
    );
  }
}
