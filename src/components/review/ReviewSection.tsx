// src/components/review/ReviewSection.tsx
import React from "react";
import type { Product, SelectedItem } from "../../types/product";
import { ReviewItem } from "./ReviewItem";

interface ReviewSectionProps {
  title: string;
  items: SelectedItem[];
  products: Product[];
  onQuantityChange: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
}

export function ReviewSection({
  title,
  items,
  products,
  onQuantityChange,
}: ReviewSectionProps) {
  if (items.length === 0) return null;

  return (
    <div
      className="
         border-gray-100 last:border-0   border-[#CED6DE] 
         border-t-[1px]   "
    >
      <p
        className="mt-4 text-[12px] 
       text-text-gray500 uppercase tracking-wider mb-3
       "
      >
        {title}
      </p>
      <div className="space-y-3">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <ReviewItem
              key={`${item.productId}-${item.variantId}`}
              item={item}
              product={product}
              onQuantityChange={onQuantityChange}
            />
          );
        })}
      </div>
    </div>
  );
}
