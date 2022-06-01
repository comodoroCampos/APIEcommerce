import { Request, Response } from "express";
import { Op } from "sequelize";
import { VentasAttributes } from "../interfaces/interfaces";
import ProductoEntity, { productAttributes } from "../model_mysql/product";
import SaleEntity, { salesAttributes } from "../model_mysql/sales";
import UserEntity from "../model_mysql/user";
import { cast } from "../utils/utilidades";
import { userAttributes } from "../model_mysql/user";

export const getSales = async (req: Request, res: Response) => {
  try {
    const sl = await SaleEntity.findAll({
      order: ["id"],
    });

    const ventas: salesAttributes[] = cast(sl);

    const sales: VentasAttributes[] = [];

    for (const key of ventas) {
      const prd: productAttributes =  cast(await
        ProductoEntity.findByPk(key.product_id)
      );
      const usr: userAttributes =  cast(await UserEntity.findByPk(key.user_id));

      console.log(prd);
      const venta: VentasAttributes = {
        id: key.id,
        amount: key.amount,
        status: key.status,
        producto: prd,
        user: usr,
        created_at: key.created_at,
        updated_at: key.updated_at,
      };
      sales.push(venta);
    }

    res.json({ sales });
  } catch (error) {
    res.json([]);
  }
};
export const getSalesFecha = async (req: Request, res: Response) => {
  const { fecha_desde, fecha_hasta } = req.params;
  try {
    const sales = await SaleEntity.findAll({
      where: {
        created_at: { [Op.between]: [fecha_desde, fecha_hasta] },
      },
      order: ["id"],
    });
    res.json({ sales });
  } catch (error) {
    res.json([]);
  }
};
