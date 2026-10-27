# Todo API

RESTful API Server สำหรับแอป Todo List พัฒนาด้วย **AdonisJS 5** + **TypeScript** และเก็บข้อมูลใน **PostgreSQL** (รองรับ MariaDB ด้วย)

Frontend: [todo-frontend](https://github.com/<your-username>/todo-frontend)

## เทคโนโลยีที่ใช้

- AdonisJS 5 (TypeScript)
- Lucid ORM + Migration
- PostgreSQL หรือ MariaDB
- AdonisJS Validator (ตรวจสอบข้อมูลก่อนบันทึก)
- Postman (ทดสอบ API)

## API Endpoints

| Method | Endpoint          | คำอธิบาย                         | Body ตัวอย่าง                 |
| ------ | ----------------- | -------------------------------- | ----------------------------- |
| GET    | `/api/todos`      | ดึงรายการทั้งหมด (ใหม่สุดอยู่บน) | -                             |
| GET    | `/api/todos/:id`  | ดึงรายการเดียว                   | -                             |
| POST   | `/api/todos`      | สร้างรายการ                      | `{ "title": "ซื้อผ้า" }`      |
| PUT    | `/api/todos/:id`  | แก้ไขรายการ                      | `{ "title": "ซื้อผ้าคอตตอน" }` |
| PATCH  | `/api/todos/:id`  | เปลี่ยนสถานะ / แก้บางฟิลด์       | `{ "isCompleted": true }`     |
| DELETE | `/api/todos/:id`  | ลบรายการ                         | -                             |

ตัวอย่าง Response

```json
{
  "id": 1,
  "title": "ซื้อผ้า",
  "isCompleted": false,
  "createdAt": "2026-10-27T04:00:00.000+07:00",
  "updatedAt": "2026-10-27T04:00:00.000+07:00"
}
```

Status code ที่ใช้: `200` สำเร็จ, `201` สร้างสำเร็จ, `204` ลบสำเร็จ, `404` ไม่พบรายการ, `422` ข้อมูลไม่ถูกต้อง

## โครงสร้างฐานข้อมูล (ตาราง `todos`)

| Column       | Type         | หมายเหตุ           |
| ------------ | ------------ | ------------------ |
| id           | increments   | Primary key        |
| title        | varchar(255) | ห้ามว่าง           |
| is_completed | boolean      | ค่าเริ่มต้น false  |
| created_at   | timestamp    |                    |
| updated_at   | timestamp    |                    |

## วิธีติดตั้งและรัน

ต้องมี Node.js 18 ขึ้นไป และ PostgreSQL (หรือ MariaDB)

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. สร้างไฟล์ .env แล้วแก้ค่าการเชื่อมต่อฐานข้อมูล
cp .env.example .env
node ace generate:key        # นำค่าที่ได้ไปใส่ APP_KEY ใน .env

# 3. สร้างฐานข้อมูลชื่อ todo_db (PostgreSQL)
createdb -U postgres todo_db

# 4. สร้างตาราง
node ace migration:run

# 5. รันเซิร์ฟเวอร์ (http://localhost:3333)
npm run dev
```

### ใช้ MariaDB แทน PostgreSQL

แก้ไฟล์ `.env` ให้ `DB_CONNECTION=mysql` แล้วใส่ค่า `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB_NAME` จากนั้นรัน `node ace migration:run`

## ทดสอบด้วย Postman

1. เปิด Postman แล้วกด **Import** เลือกไฟล์ `postman/Todo-API.postman_collection.json`
2. รันเซิร์ฟเวอร์ให้เรียบร้อย
3. คลิกขวาที่ collection **Todo API** แล้วเลือก **Run collection**

collection มี 8 requests และ 14 test assertions ครอบคลุมการสร้าง ดึงข้อมูล แก้ไข เปลี่ยนสถานะ ลบ รวมถึงกรณีข้อมูลไม่ถูกต้อง (422) และไม่พบรายการ (404)

หรือรันผ่าน command line ด้วย Newman

```bash
npx newman run postman/Todo-API.postman_collection.json
```

## โครงสร้างโปรเจกต์ที่สำคัญ

```
app/
  Controllers/Http/TodosController.ts   # logic ของ CRUD
  Models/Todo.ts                        # Lucid model
  Validators/TodoValidator.ts           # กฎตรวจสอบข้อมูล
  Exceptions/Handler.ts                 # จัดรูปแบบ error เป็น JSON
config/database.ts                      # ตั้งค่า PostgreSQL / MariaDB
database/migrations/                    # migration สร้างตาราง todos
start/routes.ts                         # กำหนด routes
postman/                                # Postman collection
```
