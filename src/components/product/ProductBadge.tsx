// src/components/product/ProductBadge.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface ProductBadgeProps {
  label: string;
  className?: string;
}

export function ProductBadge({ label, className }: ProductBadgeProps) {
  return (
    <span className={cn("badge-discount", className)}>
      {label}
    </span>
  );
}