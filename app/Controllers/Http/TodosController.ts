import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import { createTodoValidator, updateTodoValidator } from 'App/Validators/TodoValidator'

/** ป้องกันกรณีส่งชื่อเป็นช่องว่างล้วน (เช่น "   ") */
function blankTitleError(response: HttpContextContract['response']) {
  return response.unprocessableEntity({
    message: 'ข้อมูลไม่ถูกต้อง',
    errors: [{ rule: 'required', field: 'title', message: 'กรุณากรอกชื่อรายการ' }],
  })
}

export default class TodosController {
  /**
   * GET /api/todos — ดึงรายการทั้งหมด (ใหม่สุดอยู่บน)
   */
  public async index({ response }: HttpContextContract) {
    const todos = await Todo.query().orderBy('created_at', 'desc').orderBy('id', 'desc')
    return response.ok(todos)
  }

  /**
   * GET /api/todos/:id — ดึงรายการเดียว
   */
  public async show({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    return response.ok(todo)
  }

  /**
   * POST /api/todos — สร้างรายการใหม่
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(createTodoValidator)
    if (!payload.title) return blankTitleError(response)
    const todo = await Todo.create({
      title: payload.title,
      isCompleted: payload.isCompleted ?? false,
    })
    await todo.refresh()
    return response.created(todo)
  }

  /**
   * PUT/PATCH /api/todos/:id — แก้ไขชื่อ หรือเปลี่ยนสถานะเสร็จ/ยังไม่เสร็จ
   */
  public async update({ params, request, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    const payload = await request.validate(updateTodoValidator)
    if (request.input('title') !== undefined && !payload.title) return blankTitleError(response)

    if (payload.title !== undefined) todo.title = payload.title
    if (payload.isCompleted !== undefined) todo.isCompleted = payload.isCompleted

    await todo.save()
    return response.ok(todo)
  }

  /**
   * DELETE /api/todos/:id — ลบรายการ
   */
  public async destroy({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return response.noContent()
  }
}
