import { Router } from 'express';
import { getTicket } from '../controllers/ticket_controlles';


const router: Router = Router();


router.get('/', getTicket);

export default router;