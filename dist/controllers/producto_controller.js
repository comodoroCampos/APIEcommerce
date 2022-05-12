"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putProducto = exports.deleteProducto = exports.postProducto = exports.getProducto = exports.getProductos = void 0;
const productos_model_1 = __importDefault(require("../models/productos_model"));
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("no hace nada");
    const productos = yield productos_model_1.default.find();
    console.log(productos);
    res.json({
        productos
    });
});
exports.getProductos = getProductos;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const productos = yield productos_model_1.default.find({ nombre: nombre });
    res.json({
        productos
    });
});
exports.getProducto = getProducto;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const producto = body;
    const productoModel = new productos_model_1.default(producto);
    try {
        yield productoModel.save();
        res.json({
            ok: true,
            mensaje: "se ha guardado el categoria",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "ha ocurrido un error"
        });
    }
});
exports.postProducto = postProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield productos_model_1.default.findByIdAndDelete(id);
    if (!producto) {
        return res.json({
            ok: false,
            mensaje: 'No existe el producto  ' + id
        });
    }
    res.json({
        ok: true,
        mensaje: "se ha borrado el producto",
    });
});
exports.deleteProducto = deleteProducto;
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const _a = req.params, { _id } = _a, resto = __rest(_a, ["_id"]);
    try {
        const producto = yield productos_model_1.default.findByIdAndUpdate(id, resto);
        res.json({
            producto
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "ha ocurrido un error"
        });
    }
});
exports.putProducto = putProducto;
//# sourceMappingURL=producto_controller.js.map