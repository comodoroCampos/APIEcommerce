import { Request, Response } from "express";
import InventarioModel from "../models/inventario_model";
import { Inventario } from "../models/inventario_model";
import StockModel from "../models/stock_model";

export const getInventarios = async (req: Request, res: Response) => {
  const inventario = await InventarioModel.find();
  console.log(inventario);
  res.json({
    inventario,
  });
};
export const getInventario = async (req: Request, res: Response) => {
  const { producto } = req.params;
  const inventario = await InventarioModel.find({ producto: producto });
  res.json({
    inventario,
  });
};
export const postInventario = async (req: Request, res: Response) => {
  const { body } = req;
  const inventario: Inventario = body;
  const inventarioModel = new InventarioModel(inventario);
  try {
    if (inventario) {
        const stock = await StockModel.findOne({ producto: inventario.producto });
      if(inventario.tipo === "entrada"){
        stock!.cantidad += inventario.cantidad;
      }
      if(inventario.tipo === "salida"){
        stock!.cantidad -= inventario.cantidad;
      }
       await StockModel.findByIdAndUpdate(stock?.id, {cantidad:inventario.cantidad});
      await inventarioModel.save();
      res.json({
        stock,
      });
    } else {
      res.json({
        ok: false,
        mensaje: "Ha ocurrido un error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
    });
  }
};
export const deleteInventario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const inventario = await InventarioModel.findByIdAndDelete(id);
  if (!inventario) {
    return res.json({
      ok: false,
      mensaje: "No existe el producto  " + id,
    });
  }
  res.json({
    ok: true,
    mensaje: "Se ha borrado el producto",
  });
};
export const putInventario = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const { _id, ...resto } = req.params;
  try {
    const inventario = await InventarioModel.findByIdAndUpdate(id, resto);

    res.json({
      inventario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
    });
  }
};
