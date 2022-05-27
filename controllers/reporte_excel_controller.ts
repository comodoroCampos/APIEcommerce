import { Request, Response } from "express";
import ProductoEntity, { productAttributes } from "../model_mysql/product";
import { pdfProductos } from "../report/genera_pdf";
import { cast } from "../utils/utilidades";

export const getPdfProductos = async (req: Request, res: Response) => {
    try {
        const productos = await ProductoEntity.findAll({
            order: ['name']
        });

    const sl:productAttributes[]=cast(productos);

     const pdf= pdfProductos(sl);
     res.setHeader("Content-Type", "application/pdf");
     res.setHeader("Content-Disposition", 'attachment; filename=productos.pdf');
   
    res.end(pdf.output());
    
} catch (error) {
        console.log(error);
      res.json([]);
    }
  };