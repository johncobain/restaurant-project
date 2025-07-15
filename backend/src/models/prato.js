const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Prato = database.define(
  "prato",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preco: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    categoria: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Prato.associate = (models) => {
  Prato.hasMany(models.Pedido, {
    foreignKey: "pratoId",
    as: "pedidos",
  });
};

module.exports = Prato;
