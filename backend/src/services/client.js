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
    throw new NotFoundError("Cliente não encontrado");
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
    throw new NotFoundError("Cliente não encontrado");
  }
  return client;
}

async function create(clientData) {
  if (!clientData.nome || !clientData.data_nascimento || !clientData.cpf) {
    throw new BadRequestError("Dados do cliente incompletos"); // move to middleware
  }
  const existingClient = await Client.findOne({
    where: { cpf: clientData.cpf },
  });
  if (existingClient) {
    if (existingClient.active) {
      throw new ConflictError("Cliente com este CPF já existe e está ativo.");
    }
    throw new ConflictError(
      "Cliente com CPF já existe, mas está inativo. Ative-o para reutilizar (use o método POST em /clientes/active/:id para ativar)."
    );
  }
  const data = { ...clientData, active: true };
  const client = await Client.create(data);
  return client;
}

async function update(id, clientData) {
  const client = await Client.findByPk(id);
  if (!client || !client.active) {
    throw new NotFoundError("Cliente não encontrado ou inativo");
  }
  await client.update(clientData);
  return client;
}

async function activate(id) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new NotFoundError("Cliente não encontrado");
  }
  if (client.active) {
    throw new ConflictError("Cliente já está ativo");
  }
  client.active = true;
  await client.save();
  return client;
}

async function removeActive(id) {
  const client = await Client.findByPk(id);
  if (!client || !client.active) {
    throw new NotFoundError("Cliente não encontrado ou inativo");
  }
  client.active = false;
  await client.save();
  return client;
}

async function remove(id) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new NotFoundError("Cliente não encontrado");
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
