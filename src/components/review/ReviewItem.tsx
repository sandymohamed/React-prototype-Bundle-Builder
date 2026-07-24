// src/components/review/ReviewItem.tsx
import React from "react";
import type { Product, SelectedItem } from "../../types/product";
import { QuantityStepper } from "../ui/QuantityStepper";
import { ProductImage } from "../product/ProductImage";
import { ProductPrice } from "../product/ProductPrice";

interface ReviewItemProps {
  item: SelectedItem;
  product: Product;
  onQuantityChange: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
}

export function ReviewItem({
  item,
  product,
  onQuantityChange,
}: ReviewItemProps) {
  const variant = product.variants?.find((v) => v.id === item.variantId);
  const displayName = variant
    ? `${product.title} (${variant.label})`
    : product.title;

  return (
    <div className="flex flex-nowrap items-center gap-3 py-2 ">
      <ProductImage
        src={product.image}
        alt={product.title}
        className="w-12 h-12 rounded-5 bg-white p-2"
      />
      <p
        className="max-w-[40%] text-sm font-gilroy-medium 
        whitespace-break-spaces text-text-title truncate
        "
      >
        {displayName}
      </p>

      <QuantityStepper
        value={item.quantity}
        onChange={(quantity) =>
          onQuantityChange(product.id, item.variantId || null, quantity)
        }
        background="#FFFFFF"
      />
      <ProductPrice
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        className="text-sm "
        review
      />
    </div>
  );
}
