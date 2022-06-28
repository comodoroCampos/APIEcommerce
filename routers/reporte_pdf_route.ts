import { Router } from 'express';
import { getExcelProductos, getPdfBoleta, getPdfFactura, getPdfProductos, getPdfVentas } from '../controllers/reporte_excel_controller';



const router: Router = Router();

router.get('/pdf_producto', getPdfProductos);
router.get('/excel_producto', getExcelProductos);
router.get('/pdf_ventas', getPdfVentas);
router.get('/pdf_factura', getPdfFactura);
router.get('/pdf_boleta', getPdfBoleta);




export default router;