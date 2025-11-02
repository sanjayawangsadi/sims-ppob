import ServiceRepository from "../../../infrastructures/repositories/postgres/service.repository";
import GetServicesUseCase from "../../../application/usecases/service/get-services.usecase";
import ServiceResponseDto from "../dtos/service/service-response.dto";

export default class BannerService {
  constructor(private serviceRepository: ServiceRepository) {}

  async getServices() {
    const getServicesUseCase = new GetServicesUseCase(this.serviceRepository);
    const services = await getServicesUseCase.execute() ?? null;

    return services?.map((service: any) =>
      ServiceResponseDto.fromEntity(service)
    );
  }
}
