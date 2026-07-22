// src/api/endpoints/products.ts
import type { Product } from '../../types/product';
import { products } from '../../data/products';

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  if (!category) return products;
  return products.filter(p => p.category === category);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find(p => p.id === id);
}