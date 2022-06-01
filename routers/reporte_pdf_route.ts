import { Router } from 'express';
import { getExcelProductos, getPdfProductos } from '../controllers/reporte_excel_controller';



const router: Router = Router();

router.get('/pdf', getPdfProductos);
router.get('/excel', getExcelProductos);




export default router;