import { Router } from 'express';
import { deleteInventario, getInventario, getInventarios, postInventario, putInventario } from '../controllers/inventario_controller';
import { validaToken } from '../middleware/valida_token';


const router: Router = Router();

router.get('/',validaToken, getInventarios);
router.get('/:producto',validaToken, getInventario);
router.post('/', validaToken,postInventario);
router.put('/:id',validaToken, putInventario);
router.delete('/:id',validaToken, deleteInventario);


export default router;