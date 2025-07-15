const express = require("express");
const controller = require("../controllers/pedido");
const middleware = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.post("/", /*middleware.validatePedido,*/ controller.create);
router.get("/:id", controller.get);
router.get("/:id/details", controller.getDetails);
router.put("/:id", /*middleware.validatePedido,*/ controller.update);
router.delete("/:id", controller.remove);

router.post("/atendido/:id", controller.atendido);
router.delete("/atendido/:id", controller.removeAtendido);

module.exports = router;
