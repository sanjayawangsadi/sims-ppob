import Type from "../enums/transaction-type.enum";

export default class Transaction {
  constructor(
    public user_id: string,
    public transaction_type: Type,
    public total_amount: number,
    public service_id?: string,
    public readonly id?: string,
    public invoice_number?: string,
    public created_at?: string
  ) {}

  // Generate invoice number
  generateInvoice() {
    const timestamp = Math.floor(Date.now() / 1000);
    this.invoice_number = `INV-${timestamp}`;
  }
}
