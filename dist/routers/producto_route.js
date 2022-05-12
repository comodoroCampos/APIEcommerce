"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto_controller");
const router = (0, express_1.Router)();
router.get('/', producto_controller_1.getProductos);
router.get('/:nombre', producto_controller_1.getProducto);
router.post('/', producto_controller_1.postProducto);
router.put('/:id', producto_controller_1.putProducto);
router.delete('/:id', producto_controller_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto_route.js.map