import { Router } from 'express';
import { getStock } from '../controllers/producto_mysql_controller';

const router: Router = Router();

router.get('/', getStock);

export default router;