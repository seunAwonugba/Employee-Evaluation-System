import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'manager_answer_models'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('manager_name').notNullable()
      table.integer('manager_id').notNullable()
      table.string('branch').notNullable()
      table.integer('member_id').notNullable()
      table.integer('work_quality').notNullable()
      table.string('work_quality_reason').notNullable()
      table.integer('task_completion').notNullable()
      table.string('task_completion_reason').notNullable()
      table.integer('over_and_abroad').notNullable()
      table.string('over_and_abroad_reason').notNullable()
      table.integer('communication').notNullable()
      table.string('communication_reason').notNullable()
      table.string('evaluation_for_month').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
