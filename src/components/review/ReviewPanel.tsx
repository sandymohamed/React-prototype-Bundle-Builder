// src/components/review/ReviewPanel.tsx
import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ReviewSection } from './ReviewSection';
import { ReviewSummary } from './ReviewSummary';
import { steps } from '../../data/steps';

export function ReviewPanel() {
  const { state, actions } = useBuilder();
  const { selectedItems, products } = state;

  // Group selected items by category
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, typeof selectedItems> = {};
    
    steps.forEach(step => {
      groups[step.category] = selectedItems.filter(item => {
        const product = products.find(p => p.id === item.productId);
        return product?.category === step.category && item.quantity > 0;
      });
    });

    return groups;
  }, [selectedItems, products]);

  const hasItems = selectedItems.some(item => item.quantity > 0);

  const handleQuantityChange = (productId: string, variantId: string | null, quantity: number) => {
    actions.updateQuantity(productId, variantId, quantity);
  };

  return (
    <div className="card-paper sticky top-8">
      <h2 className="text-xl font-gilroy-semibold text-text-title mb-6">
        Your Security System
      </h2>

      {!hasItems ? (
        <p className="text-body text-text-muted text-center py-8">
          No items selected yet
        </p>
      ) : (
        <div className="space-y-6">
          {/* Sections for each category */}
          {steps.map(step => {
            const items = groupedItems[step.category] || [];
            if (items.length === 0) return null;

            return (
              <ReviewSection
                key={step.id}
                title={step.title}
                items={items}
                products={products}
                onQuantityChange={handleQuantityChange}
              />
            );
          })}

          <ReviewSummary />
        </div>
      )}
    </div>
  );
}