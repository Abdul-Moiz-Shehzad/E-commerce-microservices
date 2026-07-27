import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { validateRequest } from '../../../../common/utils/middleware';
import { createOrderSchema } from '../../schemas/orderSchema';

const router = Router();

router.post('/', validateRequest(createOrderSchema), (req, res, next) => orderController.create(req, res, next));
router.get('/:userId', (req, res, next) => orderController.getByUserId(req, res, next));

export default router;
