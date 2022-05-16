import { Router } from 'express';
import { deleteVentas, getVentaProducto, getVentas, postVentas, putVentas } from '../controllers/ventas_controller';



const router: Router = Router();

router.get('/', getVentas);
router.get('/:fecha_desde/:fecha_hasta/:user', getVentaProducto);
router.post('/', postVentas);
router.put('/:id', putVentas);
router.delete('/:id', deleteVentas);


export default router;