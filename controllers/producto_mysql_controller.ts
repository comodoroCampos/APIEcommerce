import { Request, Response } from 'express';
import { Op, QueryTypes } from "sequelize";
import ProductoEntity from '../model_mysql/product';

export const getStock = async (req: Request, res: Response) => {
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
      res.json({ productos });
    } catch (error) {
      res.json([]);
    }
  };