import { Router } from 'express';
import { deleteVentas, getVentasFechaUsuario, getVentas, postVentas, putVentas, getVentasFechas, getVentasUsuario } from '../controllers/ventas_controller';



const router: Router = Router();

router.get('/todos/', getVentas);
router.get('fecha-usuario/:fecha_desde/:fecha_hasta/:user', getVentasFechaUsuario);
router.get('fechas/:fecha_desde/:fecha_hasta', getVentasFechas);
router.get('usuario/:user', getVentasUsuario);
router.post('/', postVentas);
router.put('/:id', putVentas);
router.delete('/:id', deleteVentas);


export default router;