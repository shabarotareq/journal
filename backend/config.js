const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("rebuilt_voices", "rv_user", "123321", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: console.log, // لإظهار الاستعلامات في الكونسول
});

module.exports = sequelize;
