import { Router } from 'express';
import {  getSalesFecha } from '../controllers/sales_controller';

const router: Router = Router();


router.get('/', getSalesFecha);

export default router;