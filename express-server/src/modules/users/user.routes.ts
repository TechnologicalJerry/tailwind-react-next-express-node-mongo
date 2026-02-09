import { Router } from 'express';
import userController from './user.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { isAdmin } from '../../middlewares/role.middleware';
import { validate, validateQuery, validateParams } from '../../middlewares/validate.middleware';
import {

  updateUserSchema,
  getUserQuerySchema,
  userIdParamSchema,
} from './user.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

// All routes require authentication
router.use(authenticate);

router.get('/', validateQuery(getUserQuerySchema), userController.getUsers);
router.get('/profile', userController.getProfile);
router.get('/:id', validateParams(userIdParamSchema), userController.getUserById);
router.put('/:id', validateParams(userIdParamSchema), validate(updateUserSchema), userController.updateUser);
router.delete('/:id', validateParams(userIdParamSchema), isAdmin, userController.deleteUser);

export default router;
