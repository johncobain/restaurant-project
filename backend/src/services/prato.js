const { NotFoundError } = require("../errors/AppError.js");
const Prato = require("../models/prato");
const Pedido = require("../models/pedido");
const sequelize = require("../database/database.js");

async function list(query = {}) {
  return await Prato.findAll({ where: query });
}

async function get(id) {
  const prato = await Prato.findByPk(id);
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  return prato;
}

async function getDetails(id) {
  const prato = await Prato.findByPk(id, {
    include: [
      {
        association: "pedidos",
      },
    ],
  });
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  return prato;
}

async function create(pratoData) {
  return await Prato.create(pratoData);
}

async function update(id, pratoData) {
  const prato = await get(id);
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  return await prato.update(pratoData);
}

async function remove(id) {
  const prato = await get(id);
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  await prato.destroy();
}

async function listByOrdersQuantity() {
  return await Prato.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("pedidos.id")), "totalPedidos"],
      ],
    },
    include: [
      {
        model: Pedido,
        as: "pedidos",
        attributes: [],
      },
    ],
    group: ["prato.id"],
    order: [[sequelize.fn("COUNT", sequelize.col("pedidos.id")), "DESC"]],
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
