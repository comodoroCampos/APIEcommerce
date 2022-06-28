import { Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import TicketEntity from "../model_mysql/ticket";

export const getTicket = async (req: Request, res: Response) => {
  let estado = req.query.estado;
  let producto = req.query.producto;
  let usuario = req.query.usuario;
  let fecha_desde = req.query.fecha_desde;
  let fecha_hasta = req.query.fecha_hasta;
  let nro_ticket = req.query.nro_factura;

  let query = "SELECT";
   query += " tk.nro_ticket, ";
   query += " tk.sale_id, ";
   query += " tk.ticket_amount, ";
   query += " tk.created_at, ";
   query += " sal.`status`, ";
   query += " pro.name, ";
   query += " uu.name, ";
   query += " pro.name as producto ";
   query += " FROM tickets AS tk  ";
   query += " INNER JOIN sales AS sal ON tk.sale_id = sal.id  ";
   query += " INNER JOIN products AS pro ON pro.id = sal.product_id  ";
   query += " INNER JOIN users AS uu ON uu.id= sal.product_id ";

  let parametros = {};
  if (estado) {
    query += " AND sal.`status`=:estado ";
    parametros = { ...parametros, estado: estado };
  }
  if (nro_ticket) {
    query += " AND tk.nro_ticket=:nro_ticket ";
    parametros = { ...parametros, nro_ticket: nro_ticket };
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
    query += " AND tk.created_at BETWEEN :desde AND :hasta ";
    parametros = { ...parametros, desde: fecha_desde, hasta: fecha_hasta };
  }

  try {
    const ticket = await TicketEntity.sequelize?.query(query, {
      replacements: parametros,
      type: QueryTypes.SELECT,
    });
    res.json({ ticket });
  } catch (error) {
    res.json([]);
  }
};
