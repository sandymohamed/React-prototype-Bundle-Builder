export interface ProductVariant {
  id: string;
  label: string;
  thumbnail: string;
}

export type ProductCategory =
  | "camera"
  | "sensor"
  | "accessory"
  | "plan";

export interface Product {
  id: string;
  category: ProductCategory;

  title: string;
  description: string;
  learnMoreUrl: string;

  image: string;

  price: number;
  compareAtPrice: number | null;

  badge: string | null;

  variants: ProductVariant[];
}