import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'member_models'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()

      table.string('email', 255).notNullable().unique()

      table.string('gender').notNullable()
      table.string('phone_number').notNullable()
      table.string('address').notNullable()

      table.string('password', 180).notNullable()

      table.string('role').notNullable().defaultTo('member')

      table.string('branch').notNullable()

      table.string('remember_me_token').nullable()

      table.integer('manager_id').unsigned().references('manager_models.id')

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
