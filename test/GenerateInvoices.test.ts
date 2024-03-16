import { GenerateInvoices, Input } from "../src/GenerateInvoices";

test("Deve gerar notas fiscais por regime de caixa", async function() {
  const generateInvoices = new GenerateInvoices();
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
  const generateInvoices = new GenerateInvoices();
  const input: Input = {
    month: 1,
    year: 2022,
    type: "accrual"
  }
  const output = await generateInvoices.execute(input)

  expect(output.at(0)?.date).toBe("2022-01-01")
  expect(output.at(0)?.amount).toBe(500)
})

