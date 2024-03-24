import express, { json } from 'express'

import { PgPromiseAdapter } from './PgPromiseAdapter';
import { ContractsDatabaseRepository } from './ContractsDatabaseRepository';
import { GenerateInvoices } from './GenerateInvoices';
import { LoggerDecorator } from './LoggerDecorator';

const app = express()
app.use(json())

const connection = new PgPromiseAdapter()

const contractsRepository = new ContractsDatabaseRepository(connection)
const generateInvoices = new LoggerDecorator(
  new GenerateInvoices(
    contractsRepository
  )
)

app.post("/generate_invoices", async function (req, res) {
  const output = await generateInvoices.execute({ ...req.body, userAgent: req.headers['user-agent'] })
  return res.json(output)
})

app.listen(3000)
