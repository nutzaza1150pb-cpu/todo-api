/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| GET    /api/todos        ดึงรายการทั้งหมด
| GET    /api/todos/:id    ดึงรายการเดียว
| POST   /api/todos        สร้างรายการ
| PUT    /api/todos/:id    แก้ไขรายการ
| PATCH  /api/todos/:id    แก้ไขบางฟิลด์ (เช่น สถานะ)
| DELETE /api/todos/:id    ลบรายการ
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { name: 'Todo API', status: 'ok' }
})

Route.group(() => {
  Route.resource('todos', 'TodosController')
    .apiOnly()
    .where('id', { match: /^[0-9]+$/, cast: (id) => Number(id) })
}).prefix('/api')
