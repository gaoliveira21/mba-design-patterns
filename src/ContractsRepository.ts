import { Contract } from "./Contract";

export interface ContractRepository {
  list(): Promise<Contract[]>
}
