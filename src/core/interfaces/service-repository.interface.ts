import Service from "../entities/service";

export default interface ServiceRepositoryInterface {
  getServices(): Promise<Service[] | undefined>;

  getService(code: string): Promise<Service | undefined>;
}
