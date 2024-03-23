import { ContractRepository } from "./ContractsRepository";
import { DbConnection } from "./DbConnection";
import { Contract } from "./Contract";
import { Payment } from "./Payment";

export class ContractsDatabaseRepository implements ContractRepository {
  constructor(private readonly connection: DbConnection) {}

  async list(): Promise<Contract[]> {
    const contractsData = await this.connection.query("select * from mba_design_patterns.contracts")
    const contracts: Contract[] = []
    for (const contractData of contractsData) {
      const contract = new Contract(
        contractData.id,
        contractData.description,
        parseFloat(contractData.amount),
        contractData.periods,
        new Date(contractData.date),
      )

      const paymentsData = await this.connection.query("select * from mba_design_patterns.payments where id_contract = $1", contractData.id)
      for (const paymentData of paymentsData) {
        contract.addPayment(new Payment(
          paymentData.id,
          new Date(paymentData.date) ,
          parseFloat(paymentData.amount)
        ))
      }

      contracts.push(contract)
    }

    return contracts
  }
}
