import { Request, Response } from 'express';
import { Op } from "sequelize";
import ProductoEntity from '../model_mysql/product';

export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await ProductoEntity.findAll({
            order: ['name']
        });
        res.json({ productos });

    } catch (error) {
        res.json([]);
    }
}
export const getProductosFecha = async (req: Request, res: Response) => {
    const { fecha_desde,fecha_hasta} = req.params;
    try {
        const productos = await ProductoEntity.findAll({
            where: {
               
                created_at: { [Op.between]: [fecha_desde, fecha_hasta] }
               
              },
            order: ['name']
        });
        res.json({ productos });

    } catch (error) {
        res.json([]);
    }
}