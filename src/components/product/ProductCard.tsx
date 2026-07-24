import { useState } from "react";
import type { Product, SelectedItem } from "../../types/product";
import { ProductImage } from "./ProductImage";
import { ProductBadge } from "./ProductBadge";
import { ProductPrice } from "./ProductPrice";
import { VariantSelector } from "./VariantSelector";
import { QuantityStepper } from "../ui/QuantityStepper";
import { cn } from "../../utils/cn";

interface ProductCardProps {
  product: Product;
  selectedItems: SelectedItem[];
  onVariantSelect: (variantId: string) => void;
  onQuantityChange: (variantId: string | null, quantity: number) => void;
}

export function ProductCard({
  product,
  selectedItems,
  onVariantSelect,
  onQuantityChange,
}: ProductCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants && product.variants.length > 0
      ? product.variants[0].id
      : null,
  );

  const currentSelection = selectedItems.find(
    (item) =>
      item.productId === product.id && item.variantId === selectedVariantId,
  );

  const quantity = currentSelection?.quantity || 0;
  const isSelected = quantity > 0;
  const hasVariants = product.variants && product.variants.length > 0;

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    onVariantSelect(variantId);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const variantId = hasVariants ? selectedVariantId : null;
    onQuantityChange(variantId, newQuantity);
  };

  return (
    <div
      className={cn(
        "card transition-all duration-200 min-h-[170px]",
        isSelected && "card-selected",
      )}
    >
      <div className="grid grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        <div className="col-span-1">
          <div className="relative  ">
            {product.badge && (
              <div className="absolute top-0 left-0 z-10">
                <ProductBadge label={product.badge} />
              </div>
            )}
            <div className="absolute top-8 left-0 z-10">
              <ProductImage
                src={product.image}
                alt={product.title}
                className="w-full rounded-4"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 min-w-0">
          <div>
            <h3 className="text-card-title text-base mb-1">{product.title}</h3>
            {product.description ? (
              <p className="text-body text-text-card">
                {product.description}

                <a
                  href={product.learnMoreUrl}
                  className={hasVariants ? "" : " block w-[100%] " + " card-span-text"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </p>
            ): 
            <div className="w-full h-8" />
            }
          </div>

          {hasVariants && (
            <div className="mt-3">
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariantId}
                onSelect={handleVariantSelect}
              />
            </div>
          )}

          <div className="mt-[10px] flex items-center justify-between gap-4">
            <QuantityStepper
              value={quantity}
              onChange={handleQuantityChange}
              min={0}
              max={99}
            />
            <ProductPrice
              price={product.price}
              compareAtPrice={product.compareAtPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
