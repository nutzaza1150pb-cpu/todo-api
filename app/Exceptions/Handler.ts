import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    // ไม่พบรายการ (findOrFail)
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({ message: 'ไม่พบรายการ todo นี้' })
    }

    // ข้อมูลที่ส่งมาไม่ถูกต้อง
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        message: 'ข้อมูลไม่ถูกต้อง',
        errors: error.messages?.errors ?? error.messages,
      })
    }

    return super.handle(error, ctx)
  }
}
