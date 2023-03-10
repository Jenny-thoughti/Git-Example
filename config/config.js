const pathConst = require('path');
require('dotenv').config({ path: pathConst.resolve(process.cwd(), '.env') });

const { DB_TYPE } = process.env;
const { DB_HOST } = process.env;
const { DB_NAME } = process.env;
const { DB_USER } = process.env;
const DB_PASS = process.env.DB_PASS || null;

const configList = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  dialect: DB_TYPE,
};

module.exports = {
  development: configList,
  test: configList,
  production: configList,
};
