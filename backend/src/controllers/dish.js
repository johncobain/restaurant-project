const service = require("../services/dish");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const list = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.category !== undefined) {
    query.category = req.query.category;
  }
  const dishes = await service.list(query);
  return res.status(200).json(dishes);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const dish = await service.get(id);
  return res.status(200).json(dish);
});

const getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const dish = await service.getDetails(id);
  return res.status(200).json(dish);
});

const create = catchAsync(async (req, res) => {
  const dishData = req.body;
  const dish = await service.create(dishData);
  return res.status(201).json({
    message: "Dish created successfully",
    dish: dish,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const dishData = req.body;
  const dish = await service.update(id, dishData);
  return res.status(200).json({
    message: "Dish updated successfully!",
    dish: dish,
  });
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  await service.remove(id);
  return res.status(200).json({
    message: "Dish removed successfully",
  });
});

const listByOrdersQuantity = catchAsync(async (req, res) => {
  const dishes = await service.listByOrdersQuantity();
  return res.status(200).json(dishes);
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
