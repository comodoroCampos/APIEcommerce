import { Router } from 'express';
import { deleteStock, getStock, getStocks, postStock, putStock } from '../controllers/stock_controller';
import { validaToken } from '../middleware/valida_token';



const router: Router = Router();

router.get('/',validaToken, getStocks);
router.get('/:producto',validaToken, getStock);
router.post('/',validaToken, postStock);
router.put('/:id',validaToken, putStock);
router.delete('/:id', validaToken,deleteStock);


export default router;