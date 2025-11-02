import ServiceRepositoryInterface from "../../../core/interfaces/service-repository.interface";

export default class GetServicesUserCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute() {
    return await this.serviceRepository.getServices();
  }
}
