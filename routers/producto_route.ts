import { Router } from 'express';
import { getProductos, postProducto, putProducto, deleteProducto, getProducto } from '../controllers/producto_controller';
import { validaToken } from '../middleware/valida_token';


const router: Router = Router();

router.get('/',validaToken, getProductos);
router.get('/:nombre',validaToken, getProducto);
router.post('/',validaToken, postProducto);
router.put('/:id',validaToken, putProducto);
router.delete('/:id',validaToken, deleteProducto);


export default router;