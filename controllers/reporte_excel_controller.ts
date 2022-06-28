import { Request, Response } from "express";
import ProductoEntity, { productAttributes } from "../model_mysql/product";
import { pdfBoleta, pdfFactura, pdfProductos, pdfSales } from "../report/genera_pdf";
import { cast } from "../utils/utilidades";
import XLSX from "xlsx";
import { Op, QueryTypes } from "sequelize";
import SaleEntity, { salesAttributes } from "../model_mysql/sales";
import {  FacturaElement, ProductoInventario, TicketElement, VentaCompleta, VentasCompletas } from "../interfaces/interfaces";
import BillEntity from "../model_mysql/bill";
import TicketEntity from '../model_mysql/ticket';

export const getPdfProductos = async (req: Request, res: Response) => {
  let nombre = req.query.nombre;
    let descripcion = req.query.descripcion;
    let precioMin = req.query.precioMin;
    let precioMax = req.query.precioMax;
  
    let query = "SELECT";
    query += " pro.name AS nombre, ";
    query += " pro.description AS descripcion, ";
    query += " pro.price AS precio, ";
    query += " pro.quantity AS stock ";
    query += " FROM products AS pro  ";
    query += "  WHERE pro.id IS NOT NULL  ";

    let parametros = {};
    if (nombre) {
      query += " AND pro.name LIKE :nombre ";
      parametros = { ...parametros, nombre: `%${nombre}%` };
    }
    if (descripcion) {
      query += " AND pro.description LIKE :descripcion ";
      parametros = { ...parametros, descripcion: `%${descripcion}%` };
    }
    if (precioMin && precioMax) {
      query += " AND pro.price BETWEEN :precioMin AND :precioMax ";
      parametros = { ...parametros, precioMin: precioMin, precioMax: precioMax };
    }
  
    try {
      const productos = await ProductoEntity.sequelize?.query(query, {
        replacements: parametros,
        type: QueryTypes.SELECT,
      });
      const sl: ProductoInventario[] = cast(productos);

      const pdf = pdfProductos(sl);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=productos.pdf");
  
      res.end(pdf.output());
    } catch (error) {
      console.log(error);
      res.json([]);
    }
};
export const getPdfVentas = async (req: Request, res: Response) => {
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
    const sl: VentaCompleta[] = cast(sales);

    const pdf = pdfSales(sl);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=productos.pdf");

    res.end(pdf.output());
  } catch (error) {
    console.log(error);
    res.json([]);
  }
 
};
export const getPdfFactura = async (req: Request, res: Response) => {
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
    const sl: FacturaElement[] = cast(facturas);

    const pdf = pdfFactura(sl);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=productos.pdf");

    res.end(pdf.output());
  } catch (error) {
    console.log(error);
    res.json([]);
  }
 
};
export const getPdfBoleta = async (req: Request, res: Response) => {
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
    const sl: TicketElement[] = cast(ticket);

    const pdf = pdfBoleta(sl);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=productos.pdf");

    res.end(pdf.output());
  } catch (error) {
    console.log(error);
    res.json([]);
  }
 
};






export const getExcelProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoEntity.findAll({
      order: ["name"],
    });

    const sl: productAttributes[] = cast(productos);

    const workbook = XLSX.utils.book_new();
    const filename = "Productos";
 
    const dataSheet = XLSX.utils.json_to_sheet(sl);
    XLSX.utils.book_append_sheet(
      workbook,
      dataSheet,
      filename.replace("/", "")
    );
    const excel = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "FileName.xlsx"
    );

    res.end(excel);


  } catch (error) {
    console.log(error);
    res.json([]);
  }
};
