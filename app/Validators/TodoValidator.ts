import { schema, rules } from '@ioc:Adonis/Core/Validator'

const messages = {
  'title.required': 'กรุณากรอกชื่อรายการ',
  'title.maxLength': 'ชื่อรายการต้องไม่เกิน 255 ตัวอักษร',
  'title.regex': 'ชื่อรายการต้องไม่ว่าง',
  'isCompleted.boolean': 'isCompleted ต้องเป็น true หรือ false',
}

export const createTodoValidator = {
  schema: schema.create({
    title: schema.string({ trim: true }, [rules.regex(/\S/), rules.maxLength(255)]),
    isCompleted: schema.boolean.optional(),
  }),
  messages,
}

export const updateTodoValidator = {
  schema: schema.create({
    title: schema.string.optional({ trim: true }, [rules.regex(/\S/), rules.maxLength(255)]),
    isCompleted: schema.boolean.optional(),
  }),
  messages,
}
