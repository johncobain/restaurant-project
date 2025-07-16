require("dotenv").config({ path: ".env" });
require("./database/database.js");
const { errorHandler } = require("./middlewares/middlewares.js");

const express = require("express");
const cors = require("cors");

const Client = require("./models/client.js");
const Dish = require("./models/dish.js");
const Order = require("./models/order");

const models = {
  Client,
  Dish,
  Order,
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

const clientRouter = require("./routes/client");
const dishRouter = require("./routes/dish");
const orderRouter = require("./routes/order");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/clients", clientRouter);
app.use("/dishes", dishRouter);
app.use("/orders", orderRouter);

app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`Server listening on port ${process.env.PORT}`)
);

module.exports = app;
