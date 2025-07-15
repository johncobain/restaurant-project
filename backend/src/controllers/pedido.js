const service = require("../services/pedido");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const list = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.atendido !== undefined) {
    query.atendido = req.query.atendido === "true";
  }
  const pedidos = await service.list(query);
  return res.status(200).json(pedidos);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pedido = await service.get(id);
  return res.status(200).json(pedido);
});

const getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pedido = await service.getDetails(id);
  return res.status(200).json(pedido);
});

const create = catchAsync(async (req, res) => {
  const pedidoData = req.body;
  const pedido = await service.create(pedidoData);
  return res.status(201).json({
    message: "Pedido criado com sucesso",
    pedido: pedido,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pedidoData = req.body;
  const pedido = await service.update(id, pedidoData);
  return res.status(200).json({
    message: "Pedido atualizado com sucesso",
    pedido: pedido,
  });
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  await service.remove(id);
  return res.status(200).json({
    message: "Pedido removido com sucesso",
  });
});

const atendido = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pedido = await service.atendido(id);
  return res.status(200).json({
    message: "Pedido marcado como atendido",
    pedido: pedido,
  });
});

const removeAtendido = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pedido = await service.removeAtendido(id);
  return res.status(200).json({
    message: "Pedido removido do estado atendido",
    pedido: pedido,
  });
});

module.exports = {
  list,
  get,
  getDetails,
  create,
  update,
  remove,
  atendido,
  removeAtendido,
};
