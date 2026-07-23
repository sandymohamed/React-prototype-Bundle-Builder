// utils/formatters.ts
// src/utils/formatters.ts
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function calculateDiscount(price: number, comparePrice: number): number {
  return Math.round((1 - price / comparePrice) * 100);
}