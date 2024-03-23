import { Contract } from "./Contract";
import { Invoice } from "./Invoice";

export interface InvoiceGenerationStrategy {
  generate (contract: Contract, month: number, year: number): Invoice[]
}
