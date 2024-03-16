import pgp from "pg-promise";

import { ContractRepository } from "./ContractsRepository";

export class ContractsDatabaseRepository implements ContractRepository {
  async list(): Promise<any> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/postgres")
    const contracts = await connection.query("select * from mba_design_patterns.contracts")

    for (const contract of contracts) {
      contract.payments = await connection.query("select * from mba_design_patterns.payments where id_contract = $1", contract.id)
    }

    await connection.$pool.end()

    return contracts
  }
}
