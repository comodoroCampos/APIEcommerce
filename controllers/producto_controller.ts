import { Request, Response } from 'express';
import ProductoModel from '../models/productos_model';
import { Producto } from '../models/productos_model';

export const getProductos = async (req: Request, res: Response) => {
    console.log("no hace nada");
    const productos = await ProductoModel.find();
    console.log(productos);
    res.json({
        productos
    });

}
export const getProducto = async (req: Request, res: Response) => {
    const { nombre } = req.params;
    const productos = await ProductoModel.find({nombre: nombre});
    res.json({
        productos
    });

}
export const postProducto = async (req: Request, res: Response) => {
    const { body } = req;
    const producto: Producto = body;
    const productoModel = new ProductoModel(producto);
    try {

        await productoModel.save();
        res.json({
            ok: true,
            mensaje: "se ha guardado el categoria",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "ha ocurrido un error"
        });

    }

}
export const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params;

    const producto = await ProductoModel.findByIdAndDelete(id);
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
}
export const putProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const { _id, ...resto } = req.params;
    try {
        const producto = await ProductoModel.findByIdAndUpdate(id, resto);
     
        res.json({
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "ha ocurrido un error"
        });

    }

}