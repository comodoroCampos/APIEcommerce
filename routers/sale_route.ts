import { Router } from 'express';
import {  getSalesFecha, getSalesGrafico } from '../controllers/sales_controller';

const router: Router = Router();


router.get('/', getSalesFecha);
router.get('/grafico', getSalesGrafico);

export default router;