import { Router } from 'express';
import analyticsController from './analytics.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { isAdmin } from '../../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Advanced Analytics endpoints
 */

// Protect all analytics routes (e.g., admin only)
router.use(authenticate, isAdmin);

router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/price-distribution', analyticsController.getProductPriceDistribution);

export default router;
