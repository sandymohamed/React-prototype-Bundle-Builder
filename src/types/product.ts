// src/types/product.ts
export interface Variant {
  id: string;
  label: string;
  thumbnail: string;
  color?: string;
  colorHex?: string;
}

export interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  badge: string | null;
  variants: Variant[];
}

// This should be moved to bundle.ts or kept here if used in multiple places
export interface SelectedItem {
  productId: string;
  variantId?: string;
  quantity: number;
}