import { Router } from 'express';
import { getProductos, postProducto, putProducto, deleteProducto, getProducto } from '../controllers/producto_controller';


const router: Router = Router();

router.get('/', getProductos);
router.get('/:nombre', getProducto);
router.post('/', postProducto);
router.put('/:id', putProducto);
router.delete('/:id', deleteProducto);


export default router;