// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require('dotenv').config();

import { Dialect } from "sequelize";

let DB_URL;

switch (process.env.NODE_ENV) {
  case "production":
    DB_URL = process.env.PROD_DB_URL;
    break;
  case "test":
    DB_URL = process.env.TEST_DB_URL;
    break;
  default:
    DB_URL = process.env.DEV_DB_URL;
}

export default {
  PORT: process.env.PORT || 3001,
  DB_URL: DB_URL as string,
  DIALECT: process.env.DIALECT as Dialect
};