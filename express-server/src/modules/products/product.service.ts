import Product from '../../models/product.model';
import { NotFoundError } from '../../middlewares/error.middleware';
import { Types } from 'mongoose';

export interface IProductResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock: number;
  createdBy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCreate {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}

export interface IProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  isActive?: boolean;
}

export class ProductService {
  /**
   * Create a new product
   */
  async createProduct(productData: IProductCreate, createdBy: string): Promise<IProductResponse> {
    const product = await Product.create({
      ...productData,
      createdBy: new Types.ObjectId(createdBy),
    });

    return this.formatProductResponse(product);
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<IProductResponse> {
    const product = await Product.findById(productId).populate('createdBy', 'name email');
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return this.formatProductResponse(product);
  }

  /**
   * Update product
   */
  async updateProduct(productId: string, updateData: IProductUpdate): Promise<IProductResponse> {
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    Object.assign(product, updateData);
    await product.save();

    return this.formatProductResponse(product);
  }

  /**
   * Delete product (soft delete)
   */
  async deleteProduct(productId: string): Promise<void> {
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Soft delete
    product.isActive = false;
    await product.save();
  }

  /**
   * Get all products with pagination, filtering, and sorting
   */
  async getProducts(query: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    category?: string;
  }): Promise<{
    products: IProductResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
      category,
    } = query;

    // Build filter
    const filter: any = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    // Build sort
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj: any = { [sort]: sortOrder };

    // Execute query
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limit).populate('createdBy', 'name email'),
      Product.countDocuments(filter),
    ]);

    return {
      products: products.map((product) => this.formatProductResponse(product)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Format product response
   */
  private formatProductResponse(product: any): IProductResponse {
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      createdBy: product.createdBy?._id?.toString() || product.createdBy?.toString() || '',
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}

export default new ProductService();
