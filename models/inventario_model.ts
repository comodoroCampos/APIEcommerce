import {Schema, Model, Document, model} from 'mongoose';

export interface Inventario extends Document {
    cantidad: number;
    producto: string;
    fecha: Date;
    tipo: string;
    usuario: string;

}

const InventarioSchema : Schema = new Schema({
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
        default:new Date(),
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

const InventarioModel: Model<Inventario> = model('inventario', InventarioSchema);


InventarioSchema.methods.toJSON = function() {
    const inventario = this.toObject();
    return inventario;
}

export default InventarioModel ;