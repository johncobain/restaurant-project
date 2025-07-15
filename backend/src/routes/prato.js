const express = require("express");
const controller = require("../controllers/prato");
const middleware = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.post("/", middleware.validatePratoCreate, controller.create);
router.get("/popularity", controller.listByOrdersQuantity);
router.get("/:id", controller.get);
router.get("/:id/details", controller.getDetails);
router.put("/:id", middleware.validatePratoUpdate, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
