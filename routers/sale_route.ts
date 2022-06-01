import { Router } from 'express';
import { getSales, getSalesFecha } from '../controllers/sales_controller';

const router: Router = Router();

router.get('/todos/', getSales);
router.get('/fecha/:fecha_desde/:fecha_hasta', getSalesFecha);

export default router;