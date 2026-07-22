export interface SelectedItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface BundleState {
  currentStep: number;
  selectedItems: SelectedItem[];
}