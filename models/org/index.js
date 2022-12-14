const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("org", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    orgName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sport: {
      type: DataTypes.ENUM("basebell", "basketball", "hockey", "soccer"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  });
