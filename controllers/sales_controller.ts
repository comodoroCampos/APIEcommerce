import { Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import SaleEntity from "../model_mysql/sales";

export const getSalesFecha = async (req: Request, res: Response) => {
  let estado = req.query.estado;
  let producto = req.query.producto;
  let usuario = req.query.usuario;
  let fecha_desde = req.query.fecha_desde;
  let fecha_hasta = req.query.fecha_hasta;

  let query = "SELECT";
  query += " sl.id AS id, ";
  query += " pr.name AS producto, ";
  query += " sr.name AS usuario, ";
  query += " sl.amount AS mount, ";
  query += " sl.`status` AS estatus, ";
  query += " sl.created_at as fecha_creacion ";
  query += " FROM sales AS sl  ";
  query += " INNER JOIN products AS pr ON pr.id=sl.product_id ";
  query += " INNER JOIN users AS sr ON sr.id=sl.user_id ";

  let parametros = {};
  if (estado) {
    query += " AND sl.`status`=:estado ";
    parametros = { ...parametros, estado: estado };
  }
  if (producto) {
    query += " AND pr.name LIKE :producto ";
    parametros = { ...parametros, producto: `%${producto}%` };
  }
  if (usuario) {
    query += " AND sr.name LIKE :usuario ";
    parametros = { ...parametros, usuario: `%${usuario}%` };
  }
  if (fecha_desde && fecha_hasta) {
    console.log("fecha_desde", fecha_desde);
    query += " AND sl.created_at BETWEEN :desde AND :hasta ";
    parametros = { ...parametros, desde: fecha_desde, hasta: fecha_hasta };
  }

  try {
    const sales = await SaleEntity.sequelize?.query(query, {
      replacements: parametros,
      type: QueryTypes.SELECT,
    });
    res.json({ sales });
  } catch (error) {
    res.json([]);
  }
};
export const getSalesGrafico = async (req: Request, res: Response) => {



  let query = ' SELECT ';
  query += ' SUM(sl.amount) AS total, ';
  query += ' DATE_FORMAT(sl.created_at, "%d-%m-%Y") AS fecha ';
  query += ' FROM sales AS sl GROUP BY DATE_FORMAT(sl.created_at, "%d-%m-%Y") ';


  try {
    const sales = await SaleEntity.sequelize?.query(query, {
     
      type: QueryTypes.SELECT,
    });
    res.json({ sales });
  } catch (error) {
    res.json([]);
  }
};
