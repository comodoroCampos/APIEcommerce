import { Router } from 'express';
import { deleteInventario, getInventario, getInventarios, postInventario, putInventario } from '../controllers/inventario_controller';


const router: Router = Router();

router.get('/', getInventarios);
router.get('/:producto', getInventario);
router.post('/', postInventario);
router.put('/:id', putInventario);
router.delete('/:id', deleteInventario);


export default router;