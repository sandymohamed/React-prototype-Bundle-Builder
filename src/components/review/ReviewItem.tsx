// src/components/review/ReviewItem.tsx
import React from 'react';
import type { Product, SelectedItem } from '../../types/product';
import { QuantityStepper } from '../ui/QuantityStepper';
import { ProductImage } from '../product/ProductImage';
import { ProductPrice } from '../product/ProductPrice';

interface ReviewItemProps {
  item: SelectedItem;
  product: Product;
  onQuantityChange: (productId: string, variantId: string | null, quantity: number) => void;
}

export function ReviewItem({ item, product, onQuantityChange }: ReviewItemProps) {
  const variant = product.variants?.find(v => v.id === item.variantId);
  const displayName = variant 
    ? `${product.title} (${variant.label})`
    : product.title;

  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
      <ProductImage 
        src={product.image} 
        alt={product.title}
        className="w-12 h-12"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-gilroy-medium text-text-title truncate">
          {displayName}
        </p>
        <ProductPrice 
          price={product.price} 
          compareAtPrice={product.compareAtPrice}
          className="text-sm"
        />
      </div>
      <QuantityStepper
        value={item.quantity}
        onChange={(quantity) => 
          onQuantityChange(product.id, item.variantId || null, quantity)
        }
      />
    </div>
  );
}