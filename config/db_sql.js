require('dotenv').config();
const { Pool } = require('pg');

const PoolConfig = new Pool ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
      }
})

//module.exports = PoolConfig;
module.exports = {
  query: (text, params) => PoolConfig.query(text, params),
  getClient: () => PoolConfig.connect()
};