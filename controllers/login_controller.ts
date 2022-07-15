import axios from "axios";
import { InputLogin } from "../interfaces/interfaces";
import { generaToken } from "../utils/utilidades";
import { Request,  Response } from "express";

 const loginRest = async (user: string, pass: string) => {
    const url = "http://52.4.132.209:5000/login";
    
    let autorizado = false;
  try {
    const instance = axios.create({
      baseURL: url,
      params: { user, pass },
    });

    const resp = await instance.post(url);

   //const data = resp.data;
    const estado: number = resp.status;
    if (estado == 201) {
      autorizado = true;
    }
} catch (error) {
    console.log(error);
}
return autorizado;

};
export const login = async (req: Request, res: Response) => {

    const { body } = req;
    
    const parametros:InputLogin |  any=body;
    try {
      const respuesta:  boolean = await loginRest(
        parametros.email,
        parametros.password
      );
     
      if (respuesta) {
      
        const token = await generaToken(parametros.email);
       
        res.json({
          ok: true,
          token: token,
        });

      } else {

        res.json({
          ok: false,
          token: "",
        });
      }
    } catch (error) {
      res.json({
        ok: false,
        token: '',
      });
    }
  };

