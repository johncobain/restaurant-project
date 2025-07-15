const service = require("../services/cliente");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const list = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.active !== undefined) {
    query.active = req.query.active === "true";
  }
  const clientes = await service.list(query);
  return res.status(200).json(clientes);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cliente = await service.get(id);
  return res.status(200).json(cliente);
});

const getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cliente = await service.getDetails(id);
  return res.status(200).json(cliente);
});

const create = catchAsync(async (req, res) => {
  const clienteData = req.body;
  const cliente = await service.create(clienteData);
  return res.status(201).json({
    message: "Cliente criado com sucesso",
    cliente: cliente,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const clienteData = req.body;
  const cliente = await service.update(id, clienteData);
  return res.status(200).json({
    message: "Cliente editado com sucesso!",
    cliente: cliente,
  });
});

const activate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cliente = await service.activate(id);
  return res.status(200).json({
    message: "Cliente ativado com sucesso",
    cliente: cliente,
  });
});

const removeActive = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cliente = await service.removeActive(id);
  return res.status(200).json({
    message: "Cliente desativado com sucesso",
    cliente: cliente,
  });
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cliente = await service.remove(id);
  return res.status(200).json({
    message: "Cliente removido com sucesso",
    cliente: cliente,
  });
});

const listByOrdersQuantity = catchAsync(async (req, res) => {
  const { quantity } = req.query;

  const limit = parseInt(quantity, 5);
  const clientes = await service.listByOrdersQuantity(
    !isNaN(limit) ? limit : null
  );
  return res.status(200).json(clientes);
});

const listByMostSpent = catchAsync(async (req, res) => {
  const { quantity } = req.query;
  const limit = parseInt(quantity, 5);
  const clientes = await service.listByMostSpent(!isNaN(limit) ? limit : null);
  return res.status(200).json(clientes);
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
