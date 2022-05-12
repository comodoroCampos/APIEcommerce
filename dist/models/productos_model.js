"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    imagen: {
        type: [String],
        required: true
    },
    codigo: {
        type: String,
        required: true
    }
});
const ProductoModel = (0, mongoose_1.model)('producto', ProductoSchema);
ProductoSchema.methods.toJSON = function () {
    const producto = this.toObject();
    return producto;
};
exports.default = ProductoModel;
//# sourceMappingURL=productos_model.js.map