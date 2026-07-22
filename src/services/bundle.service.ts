import type { Product } from "../types/product";
import type { Step } from "../types/step";
import type { BundleState } from "../types/bundle";

export interface BundleService {
  getProducts(): Promise<Product[]>;
  getSteps(): Promise<Step[]>;
  getInitialBundle(): Promise<BundleState>;
}