import {Schema, Model, Document, model} from 'mongoose';

export interface Producto extends Document {
    nombre: string;
    precio: number;
    codigo:string;
    descripcion: string;
    categoria: string;
    imagen: string[];
}

const ProductoSchema : Schema = new Schema({
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

const ProductoModel: Model<Producto> = model('producto', ProductoSchema);


ProductoSchema.methods.toJSON = function() {
    const producto = this.toObject();
    return producto;
}

export default ProductoModel ;