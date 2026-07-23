// src/components/product/VariantSelector.tsx
import React from "react";
import type { Variant } from "../../types/product";
import { cn } from "../../utils/cn";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: string | null;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-nowrap gap-[6px]">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onSelect(variant.id)}
          className={cn(
            "flex items-center px-[1px] rounded-2 border-varient border-[.5px] transition-all duration-200",
            selectedVariant === variant.id
              ? "border-selected bg-state-varientSelectedBg"
              : "border-gray-200  bg-white",
          )}
        >
          {variant.thumbnail && (
            <img
              src={variant.thumbnail}
              alt={variant.label}
              className="w-6 h-6 rounded-full object-cover pr-1"
            />
          )}
          {variant.colorHex && !variant.thumbnail && (
            <div
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: variant.colorHex }}
            />
          )}
          <span className="text-xs font-gilroy-medium text-text-card">
            {variant.label}
          </span>
        </button>
      ))}
    </div>
  );
}
