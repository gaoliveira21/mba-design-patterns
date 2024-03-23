import { ContractsDatabaseRepository } from "../src/ContractsDatabaseRepository";
import { DbConnection } from "../src/DbConnection";
import { GenerateInvoices, Input } from "../src/GenerateInvoices";
import { PgPromiseAdapter } from "../src/PgPromiseAdapter";

let generateInvoices: GenerateInvoices
let connection: DbConnection
beforeEach(() => {
  if (!connection)
    connection = new PgPromiseAdapter()

  const contractsRepository = new ContractsDatabaseRepository(connection)
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

afterAll(async () => {
  await connection.close()
})
