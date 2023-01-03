import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from 'Contracts/enums/Role'
import MemberModel from './MemberModel'

export default class ManagerModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public gender: string

  @column()
  public phoneNumber: string

  @column()
  public address: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: Role

  @column()
  public branch: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => MemberModel, {
    foreignKey: 'managerId',
  })
  public members: HasMany<typeof MemberModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(managerModel: ManagerModel) {
    if (managerModel.$dirty.password) {
      managerModel.password = await Hash.make(managerModel.password)
    }
  }
}
