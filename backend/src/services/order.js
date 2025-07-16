const { NotFoundError } = require("../errors/AppError");
const Order = require("../models/order");
const ClientService = require("./client");

async function list(query = {}) {
  return await Order.findAll({ where: query });
}

async function get(id) {
  return await Order.findByPk(id);
}

async function getDetails(id) {
  const order = await Order.findByPk(id, {
    include: [
      {
        association: "client",
        attributes: ["id", "name"],
      },
      {
        association: "dish",
        attributes: ["id", "name", "price"],
      },
    ],
  });

  if (!order) {
    throw new NotFoundError("Pedido não encontrado");
  }
  return order;
}

async function create(data) {
  data = { ...data, atendido: false };
  await ClientService.get(data.clientId).then((client) => {
    if (client.active === false) {
      throw new NotFoundError("Cliente inativo");
    }
  });
  return await Order.create(data);
}

async function update(id, data) {
  const order = await Order.findByPk(id);
  if (!order) throw new NotFoundError("Pedido não encontrado");
  return await order.update(data);
}

async function remove(id) {
  const order = await Order.findByPk(id);
  if (!order) throw new NotFoundError("Pedido não encontrado");
  return await order.destroy();
}

async function attended(id) {
  const order = await Order.findByPk(id);
  if (!order) throw new NotFoundError("Pedido não encontrado");
  order.attended = true;
  return await order.save();
}

async function removeAttended(id) {
  const order = await Order.findByPk(id);
  if (!order) throw new NotFoundError("Pedido não encontrado");
  order.attended = false;
  return await order.save();
}

module.exports = {
  list,
  get,
  getDetails,
  create,
  update,
  remove,
  attended,
  removeAttended,
};
