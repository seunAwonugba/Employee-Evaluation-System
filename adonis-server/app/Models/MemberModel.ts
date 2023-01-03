import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Role from 'Contracts/enums/Role'
import ManagerModel from './ManagerModel'

export default class MemberModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public managerId: string

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ManagerModel, {
    localKey: 'managerId',
  })
  public manager: BelongsTo<typeof ManagerModel>

  @beforeSave()
  public static async hashPassword(memberModel: MemberModel) {
    if (memberModel.$dirty.password) {
      memberModel.password = await Hash.make(memberModel.password)
    }
  }
}
