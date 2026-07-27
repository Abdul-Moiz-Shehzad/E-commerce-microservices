import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRequest } from '../../../../common/utils/middleware';
import { registerSchema, loginSchema } from '../../schemas/authSchema';

const router = Router();

router.post('/register', validateRequest(registerSchema), (req, res, next) => authController.register(req, res, next));
router.post('/login', validateRequest(loginSchema), (req, res, next) => authController.login(req, res, next));
router.get('/validate', (req, res, next) => authController.validateToken(req, res, next));
router.get('/users', (req, res, next) => authController.getUsers(req, res, next));

export default router;
