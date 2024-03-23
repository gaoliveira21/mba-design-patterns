import { ContractsDatabaseRepository } from "../src/ContractsDatabaseRepository";
import { CsvPresenter } from "../src/CsvPresenter";
import { DbConnection } from "../src/DbConnection";
import { GenerateInvoices, Input } from "../src/GenerateInvoices";
import { PgPromiseAdapter } from "../src/PgPromiseAdapter";

let generateInvoices: GenerateInvoices
let connection: DbConnection
let contractsRepository: ContractsDatabaseRepository
beforeEach(() => {
  if (!connection)
    connection = new PgPromiseAdapter()

  contractsRepository = new ContractsDatabaseRepository(connection)
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

  expect(output.at(0)?.date.toISOString()).toBe("2022-01-05T13:00:00.000Z")
  expect(output.at(0)?.amount).toBe(6000)
})

test("Deve gerar notas fiscais por regime de competência", async function () {
  const input: Input = {
    month: 1,
    year: 2022,
    type: "accrual"
  }
  const output = await generateInvoices.execute(input)

  expect(output.at(0)?.date.toISOString()).toBe("2022-01-01T13:00:00.000Z")
  expect(output.at(0)?.amount).toBe(500)
})

test("Deve gerar notas fiscais por regime de competência por csv", async function () {
  const input: Input = {
    month: 1,
    year: 2022,
    type: "accrual"
  }
  const generateInvoices = new GenerateInvoices(contractsRepository, new CsvPresenter())
  const output = await generateInvoices.execute(input)

  expect(output).toBe("2022-01-01;500")
})

afterAll(async () => {
  await connection.close()
})
