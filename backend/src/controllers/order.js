const service = require("../services/order");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const list = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.attended !== undefined) {
    query.attended = req.query.attended === "true";
  }
  const orders = await service.list(query);
  return res.status(200).json(orders);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const order = await service.get(id);
  return res.status(200).json(order);
});

const getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const order = await service.getDetails(id);
  return res.status(200).json(order);
});

const create = catchAsync(async (req, res) => {
  const orderData = req.body;
  const order = await service.create(orderData);
  return res.status(201).json({
    message: "Order created successfully",
    order: order,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const orderData = req.body;
  const order = await service.update(id, orderData);
  return res.status(200).json({
    message: "Order updated successfully",
    order: order,
  });
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  await service.remove(id);
  return res.status(200).json({
    message: "Order removed successfully",
  });
});

const attended = catchAsync(async (req, res) => {
  const { id } = req.params;
  const order = await service.attended(id);
  return res.status(200).json({
    message: "Order marked as attended",
    order: order,
  });
});

const removeAttended = catchAsync(async (req, res) => {
  const { id } = req.params;
  const order = await service.removeAttended(id);
  return res.status(200).json({
    message: "Order removed from attended state",
    order: order,
  });
});

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
