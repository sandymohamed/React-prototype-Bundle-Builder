// src/components/product/ProductPrice.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface ProductPriceProps {
  price: number;
  compareAtPrice: number | null;
  className?: string;
}

export function ProductPrice({ price, compareAtPrice, className }: ProductPriceProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-base font-gilroy-bold text-text-title">
        ${price.toFixed(2)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-text-muted line-through">
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}