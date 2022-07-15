import { Router } from 'express';
import { login } from '../controllers/login_controller';


const router: Router = Router();


router.post('/', login);

export default router;