import type { Knex } from 'knex';
require('dotenv').config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.db_CLIENT,
    connection: {
      database: process.env.db_NAME,
      user: process.env.db_USER,
      password: process.env.db_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {}
  }
};

export default config;

// timezone: 'utc',
// typeCast: function (field, next) {
//   if (field.type === 'JSON') {
//     return JSON.parse(field.string());
//   }
//   return next();
// }
