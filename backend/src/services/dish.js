const { NotFoundError } = require("../errors/AppError.js");
const Dish = require("../models/dish.js");
const Order = require("../models/order");
const sequelize = require("../database/database.js");

async function list(query = {}) {
  return await Dish.findAll({ where: query });
}

async function get(id) {
  const dish = await Dish.findByPk(id);
  if (!dish) {
    throw new NotFoundError("Prato não encontrado");
  }
  return dish;
}

async function getDetails(id) {
  const dish = await Dish.findByPk(id, {
    include: [
      {
        association: "dishes",
      },
    ],
  });
  if (!dish) {
    throw new NotFoundError("Prato não encontrado");
  }
  return dish;
}

async function create(dishData) {
  return await Dish.create(dishData);
}

async function update(id, dishData) {
  const dish = await get(id);
  if (!dish) {
    throw new NotFoundError("Prato não encontrado");
  }
  return await dish.update(dishData);
}

async function remove(id) {
  const dish = await get(id);
  if (!dish) {
    throw new NotFoundError("Prato não encontrado");
  }
  await dish.destroy();
}

async function listByOrdersQuantity() {
  return await Dish.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("orders.id")), "totalOrders"],
      ],
    },
    include: [
      {
        model: Order,
        as: "orders",
        attributes: [],
      },
    ],
    group: ["dish.id"],
    order: [[sequelize.fn("COUNT", sequelize.col("orders.id")), "DESC"]],
  });
}

module.exports = {
  list,
  get,
  getDetails,
  create,
  update,
  remove,
  listByOrdersQuantity,
};
