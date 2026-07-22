// src/context/types.ts
import type { BundleState, SelectedItem } from '../types/bundle';
import type { Product } from '../types/product';

export interface BuilderContextType {
  state: BuilderState;
  actions: BuilderActions;
  isLoading: boolean;
  error: string | null;
}

export interface BuilderState extends BundleState {
  products: Product[];
  stepProducts: Record<number, Product[]>;
  isLoading?: boolean;
  error?: string | null;
}

export interface BuilderActions {
  // Step navigation
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  
  // Product selection
  selectVariant: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  
  // Bundle management
  saveBundle: () => Promise<void>;
  loadBundle: () => Promise<void>;
  resetBundle: () => void;
  
  // Utilities
  getTotalItems: () => number;
  getStepSummary: (step: number) => { selected: number; total: number };
  calculateTotals: () => { subtotal: number; savings: number; total: number };
}