export default class Balance {
  constructor(public money: number, public amount: number) {}

  // Increasing number of balance
  increase(): number {
    return this.money + this.amount;
  }

  // Decreasing number of balance
  decrease(): number {
    return this.money - this.amount;
  }

  // Check whether or not current balance is enough
  isEnough(): boolean {
    return this.money >= this.amount;
  }
}
