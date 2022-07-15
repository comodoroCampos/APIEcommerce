import jwt from "jsonwebtoken";
import { TokenData } from "../interfaces/interfaces";

import { SECRETJWT } from "./constantes";

export const cast = (obj: any) => {
    const newObj = JSON.stringify(obj);
    return JSON.parse(newObj);
  };

  export const parseJwt = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  
  export const generaToken = (payload: TokenData) => {
    return new Promise((resolve, reject) => {
     
      jwt.sign(
        payload,
        SECRETJWT,
        {
          expiresIn: "5h",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("no ha sido posible generar el Token");
          } else {
            resolve(token);
          }
        }
      );
    });
  };