import { Request, Response } from 'express';
import { Op } from "sequelize";
import SaleEntity from '../model_mysql/sales';

export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await SaleEntity.findAll({
            order: ['id']
        });
        res.json({ sales });

    } catch (error) {
        res.json([]);
    }
}
export const getSalesFecha = async (req: Request, res: Response) => {
    const { fecha_desde, fecha_hasta } = req.params;
    try {
        const sales = await SaleEntity.findAll({
            where: {

                created_at: { [Op.between]: [fecha_desde, fecha_hasta] }

            },
            order: ['id']
        });
        res.json({ sales });

    } catch (error) {
        res.json([]);
    }
}