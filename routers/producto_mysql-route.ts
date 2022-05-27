import { Router } from 'express';
import { getProductos, getProductosFecha } from '../controllers/producto_mysql_controller';



const router: Router = Router();

router.get('/todos/', getProductos);
router.get('/fecha/:fecha_desde/:fecha_hasta', getProductosFecha);



export default router;