import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { SECRETJWT } from "../utils/constantes";

export const validaToken = (req: Request, res: Response, next: () => void) => {
    const token = req.header("token");
  
    if (!token) {

      console.log(token);
      console.log('ACCESO_DENEGADO');
      return res.status(401).json({
        ok: false,
        token: null,
      });
    }
    try {
      jwt.verify(token!, SECRETJWT);
    } catch (error) {
      res.status(401).json({
        ok: false,
        token: null,
      });
    }
    next();
  };
