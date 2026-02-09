import Product from '../../models/product.model';

export class AnalyticsService {
    /**
     * Get consolidated dashboard statistics using advanced aggregation
     * Demonstrates: $facet, $lookup, $unwind
     */
    async getDashboardStats() {
        const stats = await Product.aggregate([
            {
                $facet: {
                    // 1. Product Statistics
                    productStats: [
                        {
                            $group: {
                                _id: null,
                                totalProducts: { $sum: 1 },
                                totalStockValue: { $sum: { $multiply: ['$price', '$stock'] } },
                                avgPrice: { $avg: '$price' },
                                minPrice: { $min: '$price' },
                                maxPrice: { $max: '$price' },
                            },
                        },
                    ],

                    // 2. Categories breakdown
                    productsByCategory: [
                        {
                            $group: {
                                _id: '$category',
                                count: { $sum: 1 },
                                avgPrice: { $avg: '$price' },
                            },
                        },
                        { $sort: { count: -1 } },
                    ],

                    // 3. Recent Products with Creator Details
                    recentProducts: [
                        { $sort: { createdAt: -1 } },
                        { $limit: 5 },
                        {
                            // Join with users collection
                            $lookup: {
                                from: 'users',
                                localField: 'createdBy',
                                foreignField: '_id',
                                as: 'creator',
                            },
                        },
                        {
                            // Flatten the creator array
                            $unwind: {
                                path: '$creator',
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        {
                            $project: {
                                name: 1,
                                price: 1,
                                category: 1,
                                createdAt: 1,
                                'creator.firstName': 1,
                                'creator.lastName': 1,
                                'creator.email': 1,
                            },
                        },
                    ],
                },
            },
        ]);

        return stats[0];
    }

    /**
     * Get product price distribution
     * Demonstrates: $bucket
     */
    async getProductPriceDistribution() {
        return Product.aggregate([
            {
                $match: { isActive: true },
            },
            {
                $bucket: {
                    groupBy: '$price',
                    boundaries: [0, 50, 200, 1000],
                    default: 'Premium', // > 1000
                    output: {
                        count: { $sum: 1 },
                        products: {
                            $push: {
                                name: '$name',
                                price: '$price',
                            },
                        },
                    },
                },
            },
        ]);
    }
}

export default new AnalyticsService();
