require('dotenv').config();

const {
  DB_NAME,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  NODE_ENV,
} = process.env;

module.exports = {
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: NODE_ENV === 'test' ? 'test-db' : DB_NAME,
  logging: false,
};
