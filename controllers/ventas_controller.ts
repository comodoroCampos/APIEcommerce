import { Request, Response } from "express";
import StockModel from "../models/stock_model";
import VentasModel, { Ventas } from '../models/ventas_model';


export const getVentas = async (req: Request, res: Response) => {
  const venta = await VentasModel.find();
  console.log(venta);
  res.json({
    venta,
  });
};

export const getVentaProducto = async (req: Request, res: Response) => {
  const { producto } = req.params;
  const venta = await VentasModel.find({ producto: producto });
  res.json({
    venta,
  });
};
export const postVentas = async (req: Request, res: Response) => {
  const { body } = req;
  const venta: Ventas = body;
  const ventaModel = new VentasModel(venta);
  try {
    if (ventaModel) {
        const stock = await StockModel.findOne({ producto: ventaModel.producto });
      if(ventaModel.tipo === "venta"){
        stock!.cantidad += ventaModel.cantidad;
      }
      if(ventaModel.tipo === "devolucion"){
        stock!.cantidad -= ventaModel.cantidad;
      }
       await StockModel.findByIdAndUpdate(stock?.id, {cantidad:ventaModel.cantidad});
      await ventaModel.save();
      res.json({
        stock,
      });
    } else {
      res.json({
        ok: false,
        mensaje: "ha ocurrido un error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: "ha ocurrido un error",
    });
  }
};
export const deleteVentas = async (req: Request, res: Response) => {
  const { id } = req.params;

  const venta = await VentasModel.findByIdAndDelete(id);
  if (!venta) {
    return res.json({
      ok: false,
      mensaje: "No existe el producto  " + id,
    });
  }
  res.json({
    ok: true,
    mensaje: "se ha borrado el producto",
  });
};
export const putVentas = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const { _id, ...resto } = req.params;
  try {
    const venta = await VentasModel.findByIdAndUpdate(id, resto);

    res.json({
      venta,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: "ha ocurrido un error",
    });
  }
};
