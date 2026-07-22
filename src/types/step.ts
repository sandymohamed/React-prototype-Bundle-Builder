import type { ProductCategory } from "./product";

export interface Step {
  id: number;
  title: string;
  category: ProductCategory;
}