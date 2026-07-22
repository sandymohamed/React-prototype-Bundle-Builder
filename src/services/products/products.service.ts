// src/services/products/products.service.ts
import { apiClient } from '../../api/client';
import type { Product } from '../../types/product';

class ProductsService {
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get<{ products: Product[] }>('/products');
    return response.data.products || response.data as unknown as Product[];
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get<{ products: Product[] }>(
      `/products/category/${category}`
    );
    return response.data.products || response.data as unknown as Product[];
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const response = await apiClient.get<{ product: Product }>(`/products/${id}`);
    return response.data.product || response.data as unknown as Product;
  }
}

export const productsService = new ProductsService();