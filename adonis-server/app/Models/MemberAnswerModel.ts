import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MemberAnswerModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public memberName: string

  @column()
  public memberId: number

  @column()
  public branch: string

  @column()
  public managerId: number

  @column()
  public workQuality: number

  @column()
  public workQualityReason: string

  @column()
  public taskCompletion: number

  @column()
  public taskCompletionReason: string

  @column()
  public overAndAbroad: number

  @column()
  public overAndAbroadReason: string

  @column()
  public communication: number

  @column()
  public communicationReason: string

  @column()
  public evaluationForMonth: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
