import { Router } from 'express';
import { productController } from '../controllers/productController';
import { validateRequest } from '../../../../common/utils/middleware';
import { createProductSchema } from '../../schemas/productSchema';

const router = Router();

router.get('/', (req, res, next) => productController.getAll(req, res, next));
router.get('/:id', (req, res, next) => productController.getById(req, res, next));
router.post('/', validateRequest(createProductSchema), (req, res, next) => productController.create(req, res, next));

export default router;
