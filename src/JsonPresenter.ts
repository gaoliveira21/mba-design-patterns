import { Output } from "./GenerateInvoices";
import { Presenter } from "./Presenter";

export class JsonPresenter implements Presenter {
  present(output: Output[]): any {
    return output
  }
}
