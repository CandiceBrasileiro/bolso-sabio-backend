const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  process.env.NM_BANCO,
  process.env.NM_SGBD,
  process.env.PASSWORD,
  {
    host: process.env.HOST_BANCO,
    dialect: process.env.DIALECT,
    logging: false,
  }
);

module.exports = connection;
