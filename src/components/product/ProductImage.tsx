// src/components/product/ProductImage.tsx
import { cn } from '../../utils/cn';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div className={cn("flex-shrink-0 rounded-lg overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/placeholder.png';
        }}
      />
    </div>
  );
}