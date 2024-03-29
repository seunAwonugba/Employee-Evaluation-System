import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ManagerModel from './ManagerModel'
import MemberModel from './MemberModel'

export default class CompanyModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public companyName: string

  @column()
  public companyWebpage: string

  @column()
  public ceoName: string

  @column()
  public companyEmail: string

  @column()
  public role: string

  @column()
  public confirmToken: string

  @column()
  public isActive: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ManagerModel, {
    foreignKey: 'companyId',
  })
  public managers: HasMany<typeof ManagerModel>

  @hasMany(() => MemberModel, {
    foreignKey: 'companyId',
  })
  public members: HasMany<typeof MemberModel>

  @beforeSave()
  public static async hashPassword(companyModel: CompanyModel) {
    if (companyModel.$dirty.password) {
      companyModel.password = await Hash.make(companyModel.password)
    }
  }
}
