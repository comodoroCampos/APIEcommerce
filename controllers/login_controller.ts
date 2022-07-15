import axios from "axios";
import { InputLogin, TokenData } from '../interfaces/interfaces';
import { generaToken } from "../utils/utilidades";
import { Request, Response } from "express";
import FormData from "form-data";

const loginRest = async (user: string, pass: string) => {
  let data = new FormData();
  data.append("email", user);
  data.append("password", pass);

  const url = "http://52.4.132.209:5000/login";

  let autorizado = false;
  var config = {
    method: 'post',
    url: 'http://52.4.132.209:5000/login',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };
  try {
    const instance = axios.create({
      baseURL: url,
      headers: { 
        ...data.getHeaders()
      },
      data: data,
      
    });

    const resp = await instance.post(url,data,config);

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

  const parametros: InputLogin | any = body;
  try {
    const respuesta: boolean = await loginRest(
      parametros.email,
      parametros.password
    );
console.log(respuesta);
    if (respuesta) {
        const tokenData:TokenData={
            user:parametros.email,
            fecha:new Date()
        };
      const token = await generaToken(tokenData);
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
      token: "",
    });
  }
};
