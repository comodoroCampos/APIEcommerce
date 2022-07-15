import { Router } from 'express';
import { getTicket } from '../controllers/ticket_controlles';
import { validaToken } from '../middleware/valida_token';


const router: Router = Router();


router.get('/',validaToken, getTicket);

export default router;