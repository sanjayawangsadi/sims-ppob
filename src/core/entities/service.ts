export default class Service {
  constructor (
    public readonly id: string,
    public service_code: string,
    public service_name: string,
    public service_icon: string,
    public service_tarif: number,
    public created_at: string,
    public updated_at: string
  ) {}
}
