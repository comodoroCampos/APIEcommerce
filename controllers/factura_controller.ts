import { Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import BillEntity from "../model_mysql/bill";

export const getFaturas = async (req: Request, res: Response) => {
  let estado = req.query.estado;
  let producto = req.query.producto;
  let usuario = req.query.usuario;
  let fecha_desde = req.query.fecha_desde;
  let fecha_hasta = req.query.fecha_hasta;
  let nro_factura = req.query.nro_factura;

  let query = "SELECT";
  query += " bil.nro_bill, ";
  query += " bil.sale_id, ";
  query += " bil.bill_amount, ";
  query += " bil.created_at, ";
  query += " sal.`status`, ";
  query += " pro.name, ";
  query += " uu.name , ";
  query += " pro.name as producto ";
  query += " FROM bills AS bil  ";
  query += " INNER JOIN sales AS sal ON bil.sale_id = sal.id  ";
  query += " INNER JOIN products AS pro ON pro.id = sal.product_id  ";
  query += " INNER JOIN users AS uu ON uu.id= sal.product_id ";

  let parametros = {};
  if (estado) {
    query += " AND sal.`status`=:estado ";
    parametros = { ...parametros, estado: estado };
  }
  if (nro_factura) {
    query += " AND bil.nro_bill=:nro_factura ";
    parametros = { ...parametros, nro_factura: nro_factura };
  }
  if (producto) {
    query += " AND pro.name LIKE :producto ";
    parametros = { ...parametros, producto: `%${producto}%` };
  }
  if (usuario) {
    query += " AND uu.name LIKE :usuario ";
    parametros = { ...parametros, usuario: `%${usuario}%` };
  }
  if (fecha_desde && fecha_hasta) {
    console.log("fecha_desde", fecha_desde);
    query += " AND bil.created_at BETWEEN :desde AND :hasta ";
    parametros = { ...parametros, desde: fecha_desde, hasta: fecha_hasta };
  }

  try {
    const facturas = await BillEntity.sequelize?.query(query, {
      replacements: parametros,
      type: QueryTypes.SELECT,
    });
    res.json({ facturas });
  } catch (error) {
    res.json([]);
  }
};
