// src/context/BuilderContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { BuilderContextType, BuilderState, BuilderActions } from "./types";
import type { BundleState, SelectedItem } from "../types/bundle";
import type { Product } from "../types/product";
import { apiClient } from "../api/client";
import { steps } from "../data/steps";

// Action types
type BuilderAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_STATE"; payload: BuilderState }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "UPDATE_SELECTION"; payload: SelectedItem }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: string;
        variantId: string | null;
        quantity: number;
      };
    }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId?: string } }
  | { type: "RESET_BUNDLE" };

// Initial state
const initialState: BuilderState = {
  currentStep: 1,
  selectedItems: [],
  products: [],
  stepProducts: {},
  isLoading: false,
  error: null,
};

// Reducer
function builderReducer(
  state: BuilderState,
  action: BuilderAction,
): BuilderState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_STATE":
      return { ...state, ...action.payload };

    case "SET_PRODUCTS": {
      const products = action.payload;
      const stepProducts: Record<number, Product[]> = {};

      steps.forEach((step) => {
        stepProducts[step.id] = products.filter(
          (p) => p.category === step.category,
        );
      });

      return { ...state, products, stepProducts };
    }

    case "GO_TO_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE_SELECTION": {
      const existingIndex = state.selectedItems.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId,
      );

      let newSelectedItems: SelectedItem[];
      if (existingIndex >= 0) {
        newSelectedItems = [...state.selectedItems];
        newSelectedItems[existingIndex] = action.payload;
      } else {
        newSelectedItems = [...state.selectedItems, action.payload];
      }

      return { ...state, selectedItems: newSelectedItems };
    }

    case "UPDATE_QUANTITY": {
      const { productId, variantId, quantity } = action.payload;

      // Find if item exists
      const existingIndex = state.selectedItems.findIndex(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      let newSelectedItems: SelectedItem[];

      if (existingIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          newSelectedItems = state.selectedItems.filter(
            (_, index) => index !== existingIndex,
          );
        } else {
          // Update quantity
          newSelectedItems = [...state.selectedItems];
          newSelectedItems[existingIndex] = {
            ...newSelectedItems[existingIndex],
            quantity,
          };
        }
      } else if (quantity > 0) {
        // Add new item
        newSelectedItems = [
          ...state.selectedItems,
          { productId, variantId: variantId || undefined, quantity },
        ];
      } else {
        newSelectedItems = state.selectedItems;
      }

      return { ...state, selectedItems: newSelectedItems };
    }

    case "REMOVE_ITEM": {
      const { productId, variantId } = action.payload;
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) =>
            !(item.productId === productId && item.variantId === variantId),
        ),
      };
    }

    case "RESET_BUNDLE":
      return {
        ...initialState,
        products: state.products,
        stepProducts: state.stepProducts,
      };

    default:
      return state;
  }
}

// Context
const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// Provider
export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    console.log("from use effect")
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        console.log("loading", isLoading)
        const response = await apiClient.get<Product[]>("/products");
        console.log("response:", response);
        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Load bundle state from API/localStorage
  const loadBundle = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<BundleState>("/bundle/state");
      const bundleState = response.data;
      dispatch({
        type: "SET_STATE",
        payload: {
          ...state,
          currentStep: bundleState.currentStep,
          selectedItems: bundleState.selectedItems,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bundle");
    } finally {
      setIsLoading(false);
    }
  }, [state]);

  // Save bundle state
  const saveBundle = useCallback(async () => {
    try {
      setIsLoading(true);
      const bundleState: BundleState = {
        currentStep: state.currentStep,
        selectedItems: state.selectedItems,
      };
      await apiClient.post("/bundle/save", bundleState);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save bundle");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [state.currentStep, state.selectedItems]);

  // Memoize actions
  const actions = useMemo<BuilderActions>(
    () => ({
      goToStep: (step: number) => {
        dispatch({ type: "GO_TO_STEP", payload: step });
      },

      nextStep: () => {
        if (state.currentStep < steps.length) {
          dispatch({ type: "GO_TO_STEP", payload: state.currentStep + 1 });
        }
      },

      previousStep: () => {
        if (state.currentStep > 1) {
          dispatch({ type: "GO_TO_STEP", payload: state.currentStep - 1 });
        }
      },

      selectVariant: (productId: string, variantId: string) => {
        // Find existing selection to preserve quantity
        const existing = state.selectedItems.find(
          (item) =>
            item.productId === productId && item.variantId === variantId,
        );

        // If item exists but quantity is 0, remove it
        if (existing && existing.quantity <= 0) {
          dispatch({
            type: "REMOVE_ITEM",
            payload: { productId, variantId },
          });
          return;
        }

        // Check if variant already selected with quantity > 0
        const hasQuantity = state.selectedItems.some(
          (item) =>
            item.productId === productId &&
            item.variantId === variantId &&
            item.quantity > 0,
        );

        // If variant exists with quantity, do nothing (already selected)
        if (hasQuantity) return;

        // Add variant with quantity 1 if not present
        dispatch({
          type: "UPDATE_SELECTION",
          payload: { productId, variantId, quantity: 1 },
        });
      },

      updateQuantity: (
        productId: string,
        variantId: string | null,
        quantity: number,
      ) => {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { productId, variantId, quantity },
        });
      },

      removeItem: (productId: string, variantId?: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
      },

      saveBundle,
      loadBundle,

      resetBundle: () => {
        dispatch({ type: "RESET_BUNDLE" });
      },

      getTotalItems: () => {
        return state.selectedItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
      },

      getStepSummary: (step: number) => {
        const stepCategory = steps.find((s) => s.id === step)?.category;
        if (!stepCategory) return { selected: 0, total: 0 };

        const stepProducts = state.products.filter(
          (p) => p.category === stepCategory,
        );

        const selected = state.selectedItems.filter((item) => {
          const product = state.products.find((p) => p.id === item.productId);
          return product?.category === stepCategory && item.quantity > 0;
        }).length;

        return {
          selected,
          total: stepProducts.length,
        };
      },

      calculateTotals: () => {
        let subtotal = 0;
        let savings = 0;

        state.selectedItems.forEach((item) => {
          const product = state.products.find((p) => p.id === item.productId);
          if (!product) return;

          const price = product.price || 0;
          const comparePrice = product.compareAtPrice || price;

          subtotal += price * item.quantity;
          if (comparePrice > price) {
            savings += (comparePrice - price) * item.quantity;
          }
        });

        return {
          subtotal,
          savings,
          total: subtotal,
        };
      },
    }),
    [state, saveBundle, loadBundle],
  );

  const value = useMemo(
    () => ({
      state,
      actions,
      isLoading,
      error,
    }),
    [state, actions, isLoading, error],
  );

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

// Custom hook
export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
