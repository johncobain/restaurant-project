const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Dish = database.define(
  "dish",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Dish.associate = (models) => {
  Dish.hasMany(models.Order, {
    foreignKey: "dishId",
    as: "orders",
  });
};

module.exports = Dish;
