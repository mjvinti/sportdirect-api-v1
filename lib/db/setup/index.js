require("dotenv").config();
const { Sequelize } = require("sequelize");

const { applyAssociations } = require("../associations");

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

const models = [
  require("../../../models/user"),
  require("../../../models/org"),
  require("../../../models/team"),
];

models.forEach((model) => model(sequelize));

applyAssociations(sequelize);

module.exports = sequelize;
