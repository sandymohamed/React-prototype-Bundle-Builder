import { cn } from "../../utils/cn";

interface ProductPriceProps {
  price: number;
  compareAtPrice: number | null;
  className?: string;
}

export function ProductPrice({
  price,
  compareAtPrice,
  className,
}: ProductPriceProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div className={cn("flex flex-col items-center gap-0 ", className)}>
      {hasDiscount && (
        <span className="text-sm text-text-error line-through p-0 m-o">
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
      <span className="text-base font-gilroy-bold text-text-title p-0 m-o">
        ${price.toFixed(2)}
      </span>
    </div>
  );
}
