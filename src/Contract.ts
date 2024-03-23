import moment from "moment"

import { Invoice } from "./Invoice"
import { Payment } from "./Payment"
import { InvoiceGenerationStrategy } from "./InvoiceGenerationStrategy"
import { InvoiceGenerationFactory } from "./InvoiceGenerationFactory"

export class Contract {
  private payments: Payment[]

  constructor(
    readonly id: string,
    readonly description: string,
    readonly amount: number,
    readonly periods: number,
    readonly date: Date,
  ) {
    this.payments = []
  }

  addPayment(payment: Payment) {
    this.payments.push(payment)
  }

  getPayments(): Payment[] {
    return this.payments
  }

  getBalance() {
    let balance = this.amount
    for (const payment of this.payments) {
      balance -= payment.amount
    }
    return balance
  }

  generateInvoices(month: number, year: number, type: string) {
    const invoiceGenerationStrategy = InvoiceGenerationFactory.create(type)

    return invoiceGenerationStrategy.generate(this, month, year)
  }
}
