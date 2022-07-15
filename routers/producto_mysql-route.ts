import { Router } from 'express';
import { getStock } from '../controllers/producto_mysql_controller';
import { validaToken } from '../middleware/valida_token';

const router: Router = Router();

router.get('/',validaToken, getStock);

export default router;