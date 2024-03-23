export class Payment {
  constructor(
    readonly id: string,
    readonly date: Date,
    readonly amount: number
  ) {}
}
