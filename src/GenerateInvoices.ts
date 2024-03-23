import moment from 'moment'

import { ContractRepository } from './ContractsRepository'
import { Presenter } from './Presenter'
import { JsonPresenter } from './JsonPresenter'

export type Input = {
  month: number
  year: number
  type: "cash" | "accrual"
}

export type Output = {
  date: Date
  amount: number
}

export class GenerateInvoices {
  constructor(
    private readonly contractsRepository: ContractRepository,
    private readonly presenter: Presenter = new JsonPresenter()
  ) {}

  async execute(input: Input): Promise<Output[]> {
    const contracts = await this.contractsRepository.list()

    const output: Output[] = []

    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.month, input.year, input.type)
      for (const invoice of invoices) {
        output.push({
          date: invoice.date,
          amount: invoice.amount
        })
      }
    }

    return this.presenter.present(output)
  }
}
