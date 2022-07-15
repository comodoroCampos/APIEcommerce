import { Router } from 'express';
import { getFaturas } from '../controllers/factura_controller';
import { validaToken } from '../middleware/valida_token';


const router: Router = Router();


router.get('/',validaToken, getFaturas);

export default router;