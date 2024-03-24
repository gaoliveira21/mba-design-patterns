import axios from 'axios'

test("Deve gerar as faturas pela api", async function (){
  const input = {
    month: 1,
    year: 2022,
    type: "cash"
  }
  const response = await axios.post("http://localhost:3000/generate_invoices", input)
  const invoice = response.data[0]
  expect(invoice.amount).toBe(6000)
  expect(invoice.date).toBe('2022-01-05T13:00:00.000Z')
})
