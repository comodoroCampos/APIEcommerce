"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VentasSchema = new mongoose_1.Schema({
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
        required: false
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
const VentasModel = (0, mongoose_1.model)('ventas', VentasSchema);
VentasSchema.methods.toJSON = function () {
    const ventas = this.toObject();
    return ventas;
};
exports.default = VentasModel;
//# sourceMappingURL=ventas_model.js.map