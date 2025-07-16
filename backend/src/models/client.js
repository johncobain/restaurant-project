const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Client = database.define(
  "client",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Client.associate = (models) => {
  Client.hasMany(models.Order, {
    foreignKey: "clientId",
    as: "orders",
  });
};

module.exports = Client;
