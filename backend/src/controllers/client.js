const service = require("../services/client");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const list = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.active !== undefined) {
    query.active = req.query.active === "true";
  }
  const clients = await service.list(query);
  return res.status(200).json(clients);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const client = await service.get(id);
  return res.status(200).json(client);
});

const getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const client = await service.getDetails(id);
  return res.status(200).json(client);
});

const create = catchAsync(async (req, res) => {
  const clientData = req.body;
  const client = await service.create(clientData);
  return res.status(201).json({
    message: "Client created successfully",
    client: client,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const clientData = req.body;
  const client = await service.update(id, clientData);
  return res.status(200).json({
    message: "Client updated successfully!",
    client: client,
  });
});

const activate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const client = await service.activate(id);
  return res.status(200).json({
    message: "Client activated successfully",
    client: client,
  });
});

const removeActive = catchAsync(async (req, res) => {
  const { id } = req.params;
  const client = await service.removeActive(id);
  return res.status(200).json({
    message: "Client deactivated successfully",
    client: client,
  });
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  const client = await service.remove(id);
  return res.status(200).json({
    message: "Client removed successfully",
    client: client,
  });
});

const listByOrdersQuantity = catchAsync(async (req, res) => {
  const { quantity } = req.query;

  const limit = parseInt(quantity, 5);
  const clients = await service.listByOrdersQuantity(
    !isNaN(limit) ? limit : null
  );
  return res.status(200).json(clients);
});

const listByMostSpent = catchAsync(async (req, res) => {
  const { quantity } = req.query;
  const limit = parseInt(quantity, 5);
  const clients = await service.listByMostSpent(!isNaN(limit) ? limit : null);
  return res.status(200).json(clients);
});

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
