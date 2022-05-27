import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
  doc.text(`Reporte Productos`, 10, 20);
  console.log(productos);
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
        { title: "Producto", dataKey: "name" },
        { title: "Slug", dataKey: "slug" },
        { title: "precio", dataKey: "price" },
        { title: "descripcion", dataKey: "description" }
      ],
      body: columnas,

      theme: "striped",
    });
   
  
    // will save the file in the
    return doc;
  }