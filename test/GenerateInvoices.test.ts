import { ContractRepository } from "../src/ContractsRepository";
import { GenerateInvoices, Input } from "../src/GenerateInvoices";

let contractsRepository: ContractRepository
let generateInvoices: GenerateInvoices
beforeEach(() => {
  contractsRepository = {
  	async list (): Promise<any> {
  		return [
  			{
  				idContract: "",
  				description: "",
  				periods: 12,
  				amount: "6000",
  				date: new Date("2022-01-01T10:00:00"),
  				payments: [
  					{
  						idPayment: "",
  						idContract: "",
  						amount: 6000,
  						date: new Date("2022-01-05T10:00:00")
  					}
  				]
  			}
  		]
  	}
  }

  generateInvoices = new GenerateInvoices(
    contractsRepository
  );
})

test("Deve gerar notas fiscais por regime de caixa", async function() {
  const input: Input = {
    month: 1,
    year: 2022,
    type: "cash"
  }
  const output = await generateInvoices.execute(input)

  expect(output.at(0)?.date).toBe("2022-01-05")
  expect(output.at(0)?.amount).toBe(6000)
})

test("Deve gerar notas fiscais por regime de competência", async function () {
  const input: Input = {
    month: 1,
    year: 2022,
    type: "accrual"
  }
  const output = await generateInvoices.execute(input)

  expect(output.at(0)?.date).toBe("2022-01-01")
  expect(output.at(0)?.amount).toBe(500)
})

