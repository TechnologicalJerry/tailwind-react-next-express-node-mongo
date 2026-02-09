import { Request, Response, NextFunction } from 'express';
import analyticsService from './analytics.service';
import { sendSuccess } from '../../utils/apiResponse';

export class AnalyticsController {
    /**
     * @swagger
     * /api/analytics/dashboard:
     *   get:
     *     summary: Get dashboard statistics (Aggregation)
     *     tags: [Analytics]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dashboard statistics retrieved successfully
     */
    async getDashboardStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const stats = await analyticsService.getDashboardStats();
            sendSuccess(res, stats, 'Dashboard statistics retrieved successfully');
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     * /api/analytics/price-distribution:
     *   get:
     *     summary: Get product price distribution (Bucket)
     *     tags: [Analytics]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Price distribution retrieved successfully
     */
    async getProductPriceDistribution(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const distribution = await analyticsService.getProductPriceDistribution();
            sendSuccess(res, distribution, 'Product price distribution retrieved successfully');
        } catch (error) {
            next(error);
        }
    }
}

export default new AnalyticsController();
