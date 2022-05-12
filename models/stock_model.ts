import {Schema, Model, Document, model} from 'mongoose';

export interface Stock extends Document {
    cantidad: number;
    producto: string;
}

const StockSchema : Schema = new Schema({
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

const StockModel: Model<Stock> = model('stock', StockSchema);


StockSchema.methods.toJSON = function() {
    const stock = this.toObject();
    return stock;
}

export default StockModel ;