import Banner from "../../../core/entities/banner";
import BannerRepositoryInterface from "../../../core/interfaces/banner-repository.interface";
import { db } from "../../configs/postgres";

export default class BannerRepository implements BannerRepositoryInterface {
  async getBanners(): Promise<Banner[] | undefined> {
    try {
      const banners = await db.manyOrNone("SELECT * FROM banners");
      const formatted: Banner[] = banners.map(
        (banner: any) =>
          new Banner(
            banner.banner_name,
            banner.banner_image,
            banner.description,
            banner.created_at,
            banner.updated_at
          )
      );
      
      return formatted;
    } catch (e) {
      console.error(e);
    }
  }
}
