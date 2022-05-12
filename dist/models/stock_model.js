"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StockSchema = new mongoose_1.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    producto: {
        type: String,
        unique: true,
        required: true
    }
});
const StockModel = (0, mongoose_1.model)('stock', StockSchema);
StockSchema.methods.toJSON = function () {
    const stock = this.toObject();
    return stock;
};
exports.default = StockModel;
//# sourceMappingURL=stock_model.js.map