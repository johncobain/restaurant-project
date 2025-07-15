const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Cliente = database.define(
  "cliente",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_nascimento: {
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

Cliente.associate = (models) => {
  Cliente.hasMany(models.Pedido, {
    foreignKey: "clienteId",
    as: "pedidos",
  });
};

module.exports = Cliente;
