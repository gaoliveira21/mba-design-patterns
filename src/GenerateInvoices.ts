import moment from 'moment'

import { ContractRepository } from './ContractsRepository'

export type Input = {
  month: number
  year: number
  type: "cash" | "accrual"
}

type Output = {
  date: string
  amount: number
}

export class GenerateInvoices {
  constructor(private readonly contractsRepository: ContractRepository) {}

  async execute(input: Input): Promise<Output[]> {
    const contracts = await this.contractsRepository.list()

    const output: Output[] = []

    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.month, input.year, input.type)
      for (const invoice of invoices) {
        output.push({
          date: moment(invoice.date).format("YYYY-MM-DD"),
          amount: invoice.amount
        })
      }
    }

    return output
  }
}
