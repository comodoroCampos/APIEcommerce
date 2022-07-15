import { Router } from 'express';
import {  getSalesFecha, getSalesGrafico } from '../controllers/sales_controller';
import { validaToken } from '../middleware/valida_token';

const router: Router = Router();


router.get('/',validaToken, getSalesFecha);
router.get('/grafico',validaToken, getSalesGrafico);

export default router;