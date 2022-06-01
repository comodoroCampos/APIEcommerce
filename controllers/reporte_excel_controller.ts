import { Request, Response } from "express";
import ProductoEntity, { productAttributes } from "../model_mysql/product";
import { pdfProductos } from "../report/genera_pdf";
import { cast } from "../utils/utilidades";
import XLSX from "xlsx";

export const getPdfProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoEntity.findAll({
      order: ["name"],
    });

    const sl: productAttributes[] = cast(productos);

    const pdf = pdfProductos(sl);
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
