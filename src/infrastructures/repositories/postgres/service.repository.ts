import Service from "../../../core/entities/service";
import ServiceRepositoryInterface from "../../../core/interfaces/service-repository.interface";
import { db } from "../../configs/postgres";

export default class ServiceRepository implements ServiceRepositoryInterface {
  async getServices(): Promise<Service[] | undefined> {
    try {
      const services = await db.manyOrNone("SELECT * FROM services");
      const formatted: Service[] = services.map(
        (service: any) =>
          new Service(
            service.id,
            service.service_code,
            service.service_name,
            service.service_icon,
            service.service_tarif,
            service.created_at,
            service.updated_at
          )
      );

      return formatted;
    } catch (e) {
      console.error(e);
    }
  }

  async getService(code: string): Promise<Service | undefined> {
    try {
      const service = await db.oneOrNone(
        "SELECT * FROM services WHERE service_code = $1",
        [code]
      );

      if (!service) return undefined;

      const formatted: Service = new Service(
        service.id,
        service.service_code,
        service.service_name,
        service.service_icon,
        service.service_tarif,
        service.created_at,
        service.updated_at
      );

      return formatted;
    } catch (e) {
      console.error(e);
    }
  }
}
