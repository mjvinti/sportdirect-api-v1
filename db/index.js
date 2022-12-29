require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

const models = [require("../models/user")];

models.forEach((model) => model(sequelize));

module.exports = sequelize;
