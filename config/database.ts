/**
 * Database config
 * รองรับทั้ง PostgreSQL (ค่าเริ่มต้น) และ MariaDB/MySQL
 * เปลี่ยนได้ที่ DB_CONNECTION ในไฟล์ .env
 */

import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'pg'),

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST', '127.0.0.1'),
        port: Env.get('PG_PORT', 5432),
        user: Env.get('PG_USER', 'postgres'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME', 'todo_db'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

    mysql: {
      client: 'mysql2',
      connection: {
        host: Env.get('MYSQL_HOST', '127.0.0.1'),
        port: Env.get('MYSQL_PORT', 3306),
        user: Env.get('MYSQL_USER', 'root'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME', 'todo_db'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
