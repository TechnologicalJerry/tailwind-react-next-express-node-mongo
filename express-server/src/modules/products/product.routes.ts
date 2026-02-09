import { Router } from 'express';
import productController from './product.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { isAdmin } from '../../middlewares/role.middleware';
import { validate, validateQuery, validateParams } from '../../middlewares/validate.middleware';
import {
  createProductSchema,
  updateProductSchema,
  getProductQuerySchema,
  productIdParamSchema,
} from './product.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

router.get('/', validateQuery(getProductQuerySchema), productController.getProducts);
router.get('/:id', validateParams(productIdParamSchema), productController.getProductById);
router.post('/', authenticate, validate(createProductSchema), productController.createProduct);
router.put('/:id', authenticate, validateParams(productIdParamSchema), validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', authenticate, validateParams(productIdParamSchema), isAdmin, productController.deleteProduct);

export default router;
