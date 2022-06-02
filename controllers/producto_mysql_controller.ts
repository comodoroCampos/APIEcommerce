import { Request, Response } from 'express';
import { Op } from "sequelize";
import ProductoEntity from '../model_mysql/product';
import SaleEntity from '../model_mysql/sales';

export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await ProductoEntity.findAll({
            include:[
                {model:SaleEntity},
            
                
             ],
            order: ['name']
        });
        res.json({ productos });

    } catch (error) {
        res.json([]);
    }
}
export const getProductoById = async (req: Request, res: Response) => {
    const { id} = req.params;
    try {
        const productos = await ProductoEntity.findAll({
            include:[
                {model:SaleEntity},

             ],
             where: {
                id: id
              },
            order: ['name']
        });
        res.json({ productos });

    } catch (error) {
        res.json([]);
    }
}
export const getProductosFecha = async (req: Request, res: Response) => {
    const { min,max} = req.params;
    try {
        const productos = await ProductoEntity.findAll({
            where: {
               
                price: { [Op.between]: [min, max] }
               
              },
            order: ['name']
        });
        res.json({ productos });

    } catch (error) {
        res.json([]);
    }
}