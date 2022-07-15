"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto_controller");
const valida_token_1 = require("../middleware/valida_token");
const router = (0, express_1.Router)();
router.get('/', valida_token_1.validaToken, producto_controller_1.getProductos);
router.get('/:nombre', valida_token_1.validaToken, producto_controller_1.getProducto);
router.post('/', valida_token_1.validaToken, producto_controller_1.postProducto);
router.put('/:id', valida_token_1.validaToken, producto_controller_1.putProducto);
router.delete('/:id', valida_token_1.validaToken, producto_controller_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto_route.js.map