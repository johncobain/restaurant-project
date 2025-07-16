const express = require("express");
const controller = require("../controllers/order");
const middleware = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.get("/:id/details", controller.getDetails);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

router.post("/attended/:id", controller.attended);
router.delete("/attended/:id", controller.removeAttended);

module.exports = router;
