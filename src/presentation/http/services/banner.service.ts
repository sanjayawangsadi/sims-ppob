import BannerRepository from "../../../infrastructures/repositories/postgres/banner.repository";
import GetBannersUseCase from "../../../application/usecases/banner/get-banners.usecase";
import BannerResponseDto from "../dtos/banner/banner-response.dto";

export default class BannerService {
  constructor(private bannerRepository: BannerRepository) {}

  async getBanners() {
    const getBannersUseCase = new GetBannersUseCase(this.bannerRepository);
    const banners = (await getBannersUseCase.execute()) ?? null;

    return banners?.map((banner: any) => BannerResponseDto.fromEntity(banner));
  }
}
