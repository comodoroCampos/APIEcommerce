import {Schema, Model, Document, model} from 'mongoose';

export interface Ventas extends Document {
    cantidad: number;
    producto: string;
    fecha: Date;
    tipo: string;
    usuario: string;

}

const VentasSchema : Schema = new Schema({
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

const VentasModel: Model<Ventas> = model('ventas', VentasSchema);


VentasSchema.methods.toJSON = function() {
    const ventas = this.toObject();
    return ventas;
}

export default VentasModel ;