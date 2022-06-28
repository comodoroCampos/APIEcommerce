import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { INTEGER } from "sequelize/types";
import { FacturaElement, ProductoInventario, TicketElement, VentaCompleta, VentasCompletas } from "../interfaces/interfaces";
import { productAttributes } from "../model_mysql/product";
import { salesAttributes } from "../model_mysql/sales";


export const pdfProductos= (productos: ProductoInventario[]) => {
   
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
  
    //crea table pdf
    doc.setLanguage("es-ES");
  //const logo=fs.readFileSync(path.join(__dirname,`/../../assents/logo.png`)).toString('base64');
  doc.text(`Reporte Stock`, 50, 20);
  console.log(productos);

  //var a = new Number('1');

  var myInt = 1;

const columnas=[];
  for (const producto of productos) {
    columnas.push( {
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        description: producto.descripcion??'',
       })
  }

    autoTable(doc, {
      startY: 30,
      columnStyles: { name: { halign: "left" } },
      columns: [
        { title: "Nro", dataKey: myInt++},
        { title: "Producto", dataKey: "nombre" },
        { title: "Stock", dataKey: "stock" },
        { title: "Precio", dataKey: "precio" },
        { title: "Descripcion", dataKey: "description" }
      ],
      body: columnas,

      theme: "striped",
    });
   
  
    // will save the file in the
    return doc;
  }



export const pdfSales= (sale: VentaCompleta[]) => {
   
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
  
    //crea table pdf
    doc.setLanguage("es-ES");
  //const logo=fs.readFileSync(path.join(__dirname,`/../../assents/logo.png`)).toString('base64');
  doc.text(`Reporte Ventas`, 50, 20);
 

  //var a = new Number('1');

  var myInt = 1;

const columnas=[];
  for (const sl of sale) {
    columnas.push( {
        name: sl.producto,
        usuario: sl.usuario,
        price: sl.mount,
        estado: sl.estatus??'',
       })
  }

    autoTable(doc, {
      startY: 30,
      columnStyles: { name: { halign: "left" } },
      columns: [
        { title: "Nro", dataKey: myInt++},
        { title: "Productos", dataKey: "name" },
        { title: "Usuario", dataKey: "usuario" },
        { title: "Precio", dataKey: "price" },
        { title: "estado", dataKey: "estado" }
      ],
      body: columnas,

      theme: "striped",
    });
   
  
    // will save the file in the
    return doc;
  }
export const pdfFactura= (factura: FacturaElement[]) => {
   
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
  
    //crea table pdf
    doc.setLanguage("es-ES");
  //const logo=fs.readFileSync(path.join(__dirname,`/../../assents/logo.png`)).toString('base64');
  doc.text(`Reporte Factura`, 50, 20);
 

  //var a = new Number('1');

  var myInt = 1;

const columnas=[];
  for (const sl of factura) {
    columnas.push( {
        folio: sl.nro_bill,
        usuario: sl.name,
        price: sl.bill_amount,
        estado: sl.status??'',
       })
  }

    autoTable(doc, {
      startY: 30,
      columnStyles: { name: { halign: "left" } },
      columns: [
        { title: "Nro", dataKey: myInt++},
        { title: "Folio", dataKey: "folio" },
        { title: "Usuario", dataKey: "usuario" },
        { title: "Precio", dataKey: "price" },
        { title: "estado", dataKey: "estado" }
      ],
      body: columnas,

      theme: "striped",
    });
   
  
    // will save the file in the
    return doc;
  }
export const pdfBoleta= (boleta: TicketElement[]) => {
   
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
  
    //crea table pdf
    doc.setLanguage("es-ES");
  //const logo=fs.readFileSync(path.join(__dirname,`/../../assents/logo.png`)).toString('base64');
  doc.text(`Reporte Boleta`, 50, 20);
 

  //var a = new Number('1');

  var myInt = 1;

const columnas=[];
  for (const sl of boleta) {
    columnas.push( {
        folio: sl.nro_ticket,
        usuario: sl.name,
        price: sl.ticket_amount,
        estado: sl.status??'',
       })
  }

    autoTable(doc, {
      startY: 30,
      columnStyles: { name: { halign: "left" } },
      columns: [
        { title: "Nro", dataKey: myInt++},
        { title: "Boleta", dataKey: "folio" },
        { title: "Usuario", dataKey: "usuario" },
        { title: "Precio", dataKey: "price" },
        { title: "estado", dataKey: "estado" }
      ],
      body: columnas,

      theme: "striped",
    });
   
  
    // will save the file in the
    return doc;
  }