import { Output } from "./GenerateInvoices";

export interface Presenter {
  present(output: Output[]): any
}
