import moment from "moment";
import { Output } from "./GenerateInvoices";
import { Presenter } from "./Presenter";

export class CsvPresenter implements Presenter {
  present(output: Output[]): any {
    const lines: string[] = []
    for (const invoice of output) {
      const line: string[] = []
      line.push(moment(invoice.date).format("YYYY-MM-DD"))
      line.push(String(invoice.amount))
      lines.push(line.join(";"));
    }
    return lines.join("\n")
  }
}
