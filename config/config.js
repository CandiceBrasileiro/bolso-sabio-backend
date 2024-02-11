require('dotenv').config();
module.exports = {
  development: {
    username: process.env.NM_SGBD,
    password: process.env.PASSWORD,
    database: process.env.NM_BANCO,
    host: process.env.HOST_BANCO,
    dialect: process.env.DIALECT,
  },
};
