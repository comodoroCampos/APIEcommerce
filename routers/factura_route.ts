import { Router } from 'express';
import { getFaturas } from '../controllers/factura_controller';


const router: Router = Router();


router.get('/', getFaturas);

export default router;