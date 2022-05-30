import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { INTEGER } from "sequelize/types";
import { productAttributes } from "../model_mysql/product";


export const pdfProductos= (productos: productAttributes[]) => {
   
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
        name: producto.name,
        slug: producto.slug,
        price: producto.price,
        description: producto.description??'',
       })
  }

    autoTable(doc, {
      startY: 30,
      columnStyles: { name: { halign: "left" } },
      columns: [
        { title: "Nro", dataKey: myInt++},
        { title: "Productos", dataKey: "name" },
        { title: "Slug", dataKey: "slug" },
        { title: "Precio", dataKey: "price" },
        { title: "Descripcion", dataKey: "description" }
      ],
      body: columnas,

      theme: "striped",
    });
   
  
    // will save the file in the
    return doc;
  }