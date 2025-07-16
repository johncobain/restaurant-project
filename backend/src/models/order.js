const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Order = database.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "id",
      },
    },
    dishId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "dishes",
        key: "id",
      },
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    attended: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Order.associate = function (models) {
  Order.belongsTo(models.Client, { foreignKey: "clientId", as: "client" });
  Order.belongsTo(models.Dish, { foreignKey: "dishId", as: "dish" });
};

module.exports = Order;
