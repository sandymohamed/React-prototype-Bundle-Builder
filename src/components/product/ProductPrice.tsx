import { cn } from "../../utils/cn";

interface ProductPriceProps {
  price: number;
  compareAtPrice: number | null;
  className?: string;
  review?: boolean;
}

export function ProductPrice({
  price,
  compareAtPrice,
  className,
  review = false,
}: ProductPriceProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div className={cn("flex flex-col items-center gap-0 ", className)}>
      {hasDiscount && (
        <span
          className={
            " text-sm line-through p-0 m-o" +
            (review ? "  text-text-gray600 medium-400" : " text-text-error ")
          }
        >
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
      <span
        className={
          "text-base p-0 m-o " +
          (review
            ? "  text-accent-blue  semibold-400 text-md"
            : "  text-text-muted font-gilroy ")
        }
        style={{
          fontWeight: 400,
        }}
      >
        ${price.toFixed(2)}
      </span>
    </div>
  );
}
