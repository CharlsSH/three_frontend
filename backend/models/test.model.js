const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Test = sequelize.define("Test", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Test;
