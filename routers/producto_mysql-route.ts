import { Router } from 'express';
import { getProductos, getProductosFecha, getProductoById } from '../controllers/producto_mysql_controller';

const router: Router = Router();

router.get('/todos/', getProductos);
router.get('/ventas/:id', getProductoById);
router.get('/fecha/:min/:max', getProductosFecha);

export default router;