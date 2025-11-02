import BannerRepositoryInterface from "../../../core/interfaces/banner-repository.interface";

export default class ShowBannersUserCase {
  constructor(private bannerRepository: BannerRepositoryInterface) {}

  execute() {
    return this.bannerRepository.getBanners()
  }
}
