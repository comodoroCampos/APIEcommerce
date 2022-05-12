import { Request, Response } from 'express';
import StockModel, { Stock } from '../models/stock_model';


export const getStocks = async (req: Request, res: Response) => {
    console.log("no hace nada");
    const stock = await StockModel.find();
    console.log(stock);
    res.json({
        stock
    });

}
export const getStock = async (req: Request, res: Response) => {
    const { producto } = req.params;
    const stock = await StockModel.find({producto: producto});
    res.json({
        stock
    });

}
export const postStock = async (req: Request, res: Response) => {
    const { body } = req;
    const stock: Stock = body;
    const stockModel = new StockModel(stock);
    try {

        await stockModel.save();
        res.json({
            ok: true,
            mensaje: "se ha guardado el stock",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "ha ocurrido un error"
        });

    }

}
export const deleteStock = async (req: Request, res: Response) => {
    const { id } = req.params;

    const stock = await StockModel.findByIdAndDelete(id);
    if (!stock) {
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
export const putStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const { _id, ...resto } = req.params;
    try {
        const stock = await StockModel.findByIdAndUpdate(id, resto);
     
        res.json({
            stock
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "ha ocurrido un error"
        });

    }

}