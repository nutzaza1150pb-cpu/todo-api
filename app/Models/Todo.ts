import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column({
    serializeAs: 'isCompleted',
    // MariaDB เก็บ boolean เป็น 0/1 จึงแปลงให้เป็น true/false เสมอ
    consume: (value) => Boolean(value),
  })
  public isCompleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}
