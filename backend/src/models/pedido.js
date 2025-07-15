const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Pedido = database.define(
  "pedido",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clienteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id",
      },
    },
    pratoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "pratos",
        key: "id",
      },
    },
    data_pedido: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    atendido: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Pedido.associate = function (models) {
  Pedido.belongsTo(models.Cliente, { foreignKey: "clienteId", as: "cliente" });
  Pedido.belongsTo(models.Prato, { foreignKey: "pratoId", as: "prato" });
};

module.exports = Pedido;
