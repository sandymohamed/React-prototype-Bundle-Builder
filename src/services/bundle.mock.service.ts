import { products } from "../data/products";
import { steps } from "../data/steps";
import { initialBundle } from "../data/initialBundle";

import type { BundleService } from "./bundle.service";

class BundleMockService implements BundleService {
  async getProducts() {
    return structuredClone(products);
  }

  async getSteps() {
    return structuredClone(steps);
  }

  async getInitialBundle() {
    return structuredClone(initialBundle);
  }
}

export default new BundleMockService();
