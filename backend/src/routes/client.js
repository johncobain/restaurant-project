const express = require("express");
const controller = require("../controllers/client");
const middleware = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.post("/", middleware.validateClientCreate, controller.create);
router.get("/most-orders", controller.listByOrdersQuantity);
router.get("/most-spent", controller.listByMostSpent);
router.get("/:id", controller.get);
router.get("/:id/details", controller.getDetails);
router.put("/:id", middleware.validateClientUpdate, controller.update);
router.delete("/:id", controller.remove);

router.post("/active/:id", controller.activate);
router.delete("/active/:id", controller.removeActive);

module.exports = router;
