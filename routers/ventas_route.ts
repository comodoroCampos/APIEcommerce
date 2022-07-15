import { Router } from 'express';
import { deleteVentas, getVentasFechaUsuario, getVentas, postVentas, putVentas, getVentasFechas, getVentasUsuario } from '../controllers/ventas_controller';
import { validaToken } from '../middleware/valida_token';



const router: Router = Router();

router.get('/todos/',validaToken, getVentas);
router.get('/fecha-usuario/:fecha_desde/:fecha_hasta/:user',validaToken, getVentasFechaUsuario);
router.get('/fechas/:fecha_desde/:fecha_hasta',validaToken, getVentasFechas);
router.get('/usuario/:user',validaToken, getVentasUsuario);
router.post('/',validaToken, postVentas);
router.put('/:id',validaToken, putVentas);
router.delete('/:id',validaToken, deleteVentas);


export default router;