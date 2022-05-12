"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InventarioSchema = new mongoose_1.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: new Date(),
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    }
});
const InventarioModel = (0, mongoose_1.model)('inventario', InventarioSchema);
InventarioSchema.methods.toJSON = function () {
    const inventario = this.toObject();
    return inventario;
};
exports.default = InventarioModel;
//# sourceMappingURL=inventario_model.js.map