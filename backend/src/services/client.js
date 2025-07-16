const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../errors/AppError");
const sequelize = require("../database/database");
const Client = require("../models/client");
const Order = require("../models/order");
const Dish = require("../models/dish");

async function list(query = {}) {
  return await Client.findAll({ where: query });
}

async function get(id) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new NotFoundError("Client not found");
  }
  return client;
}

async function getDetails(id) {
  const client = await Client.findByPk(id, {
    include: [
      {
        association: "orders",
      },
    ],
  });
  if (!client) {
    throw new NotFoundError("Client not found");
  }
  return client;
}

async function create(clientData) {
  if (!clientData.name || !clientData.birthDate || !clientData.cpf) {
    throw new BadRequestError("Client Data is required"); // move to middleware
  }
  const existingClient = await Client.findOne({
    where: { cpf: clientData.cpf },
  });
  if (existingClient) {
    if (existingClient.active) {
      throw new ConflictError(
        "Client with this CPF already exists and is active."
      );
    }
    throw new ConflictError(
      "Client with CPF already exists, but is inactive. Activate it to reuse (use the POST method on /clientes/active/:id to activate)."
    );
  }
  const data = { ...clientData, active: true };
  const client = await Client.create(data);
  return client;
}

async function update(id, clientData) {
  const client = await Client.findByPk(id);
  if (!client || !client.active) {
    throw new NotFoundError("Client not found or inactive");
  }
  await client.update(clientData);
  return client;
}

async function activate(id) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new NotFoundError("Client not found");
  }
  if (client.active) {
    throw new ConflictError("Client is already active");
  }
  client.active = true;
  await client.save();
  return client;
}

async function removeActive(id) {
  const client = await Client.findByPk(id);
  if (!client || !client.active) {
    throw new NotFoundError("Client not found or inactive");
  }
  client.active = false;
  await client.save();
  return client;
}

async function remove(id) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new NotFoundError("Client not found");
  }
  await client.destroy();
  return client;
}

async function listByOrdersQuantity(limit) {
  const query = {
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
    group: ["client.id"],
    order: [[sequelize.fn("COUNT", sequelize.col("orders.id")), "DESC"]],
    subQuery: false,
  };
  if (limit) {
    query.limit = limit;
  }
  return await Cliente.findAll(query);
}

async function listByMostSpent(limit) {
  const query = {
    attributes: {
      include: [
        [sequelize.fn("SUM", sequelize.col("orders.dish.price")), "totalSpent"],
      ],
    },
    include: [
      {
        model: Order,
        as: "orders",
        attributes: [],
        include: [
          {
            model: Dish,
            as: "dishes",
            attributes: [],
          },
        ],
      },
    ],
    group: ["client.id"],
    order: [[sequelize.literal('"totalSpent"'), "DESC NULLS LAST"]],
    subQuery: false,
  };
  if (limit) {
    query.limit = limit;
  }
  return await Client.findAll(query);
}

module.exports = {
  list,
  get,
  getDetails,
  create,
  update,
  activate,
  removeActive,
  remove,
  listByOrdersQuantity,
  listByMostSpent,
};
