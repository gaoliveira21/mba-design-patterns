import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

import { DbConnection } from "./DbConnection";

export class PgPromiseAdapter implements DbConnection {
  private connection: pgPromise.IDatabase<{}, pg.IClient>

  constructor() {
    this.connection = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres")
  }

  query(statement: string, params?: any): Promise<any> {
    return this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}
