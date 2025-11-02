export default class BannerResponseDto {
  constructor(
    public service_code: string,
    public service_name: string,
    public service_icon: string,
    public service_tariff: number
  ) {}

  static fromEntity(service: any): BannerResponseDto {
    return new BannerResponseDto(
      service.service_code,
      service.service_name,
      service.service_icon,
      service.service_tariff
    );
  }
}
