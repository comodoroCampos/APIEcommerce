import { Router } from 'express';
import { getPdfProductos } from '../controllers/reporte_excel_controller';



const router: Router = Router();

router.get('/', getPdfProductos);




export default router;