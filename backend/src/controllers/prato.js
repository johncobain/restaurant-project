const service = require("../services/prato");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const list = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.categoria !== undefined) {
    query.categoria = req.query.categoria;
  }
  const pratos = await service.list(query);
  return res.status(200).json(pratos);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const prato = await service.get(id);
  return res.status(200).json(prato);
});

const getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const prato = await service.getDetails(id);
  return res.status(200).json(prato);
});

const create = catchAsync(async (req, res) => {
  const pratoData = req.body;
  const prato = await service.create(pratoData);
  return res.status(201).json({
    message: "Prato criado com sucesso",
    prato: prato,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pratoData = req.body;
  const prato = await service.update(id, pratoData);
  return res.status(200).json({
    message: "Prato editado com sucesso!",
    prato: prato,
  });
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  await service.remove(id);
  return res.status(200).json({
    message: "Prato removido com sucesso",
  });
});

const listByOrdersQuantity = catchAsync(async (req, res) => {
  const pratos = await service.listByOrdersQuantity();
  return res.status(200).json(pratos);
});

module.exports = {
  list,
  get,
  getDetails,
  create,
  update,
  remove,
  listByOrdersQuantity,
};
