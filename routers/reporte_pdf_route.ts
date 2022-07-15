import { Router } from 'express';
import { getExcelProductos, getPdfBoleta, getPdfFactura, getPdfProductos, getPdfVentas } from '../controllers/reporte_excel_controller';
import { validaToken } from '../middleware/valida_token';



const router: Router = Router();

router.get('/pdf_producto',validaToken, getPdfProductos);
router.get('/excel_producto',validaToken, getExcelProductos);
router.get('/pdf_ventas',validaToken, getPdfVentas);
router.get('/pdf_factura',validaToken, getPdfFactura);
router.get('/pdf_boleta',validaToken, getPdfBoleta);




export default router;