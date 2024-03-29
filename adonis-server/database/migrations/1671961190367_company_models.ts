import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Role from 'Contracts/enums/Role'

export default class extends BaseSchema {
  protected tableName = 'company_models'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('company_name').notNullable().unique()
      table.string('company_webpage').nullable()
      table.string('ceo_name').notNullable()
      table.string('company_email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('role').notNullable().defaultTo(Role.COMPANY_USER)

      table.string('confirm_token')
      table.boolean('is_active').defaultTo(false)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
