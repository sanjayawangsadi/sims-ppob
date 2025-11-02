import Banner from "../entities/banner"

export default interface BannerRepositoryInterface {
  getBanners(): Promise<Banner[] | undefined>
}