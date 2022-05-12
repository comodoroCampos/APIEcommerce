import { Router } from 'express';
import { deleteStock, getStock, getStocks, postStock, putStock } from '../controllers/stock_controller';



const router: Router = Router();

router.get('/', getStocks);
router.get('/:producto', getStock);
router.post('/', postStock);
router.put('/:id', putStock);
router.delete('/:id', deleteStock);


export default router;