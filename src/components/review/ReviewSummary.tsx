// src/components/review/ReviewSummary.tsx
import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../ui/Button';
import { formatPrice } from '../../utils/formatters';

export function ReviewSummary() {
  const { actions } = useBuilder();
  const { selectedItems, products } = useBuilder().state;

  // Calculate totals
  const totals = React.useMemo(() => {
    let subtotal = 0;
    let savings = 0;
    
    selectedItems.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return;
      
      const price = product.price || 0;
      const comparePrice = product.compareAtPrice || price;
      
      subtotal += price * item.quantity;
      if (comparePrice > price) {
        savings += (comparePrice - price) * item.quantity;
      }
    });
    
    return {
      subtotal,
      savings,
      total: subtotal,
    };
  }, [selectedItems, products]);

  const handleSaveSystem = () => {
    actions.saveBundle();
    // Show confirmation
    alert('Your system has been saved!');
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout! (This is a prototype)');
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      {/* Shipping */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-text-secondary">Shipping</span>
        <span className="text-text-title font-gilroy-medium">Free</span>
      </div>

      {/* Satisfaction Guarantee */}
      <div className="flex items-center gap-2 mb-3 text-sm text-accent-green bg-green-50 px-3 py-2 rounded-lg">
        <span className="text-xl">🛡️</span>
        <span className="font-gilroy-medium">30-Day Satisfaction Guarantee</span>
      </div>

      {/* Financing */}
      <div className="text-xs text-text-muted mb-4">
        or 4 interest-free payments of {formatPrice(totals.total / 4)} with Afterpay
      </div>

      {/* Total */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-baseline">
          <span className="text-base font-gilroy-semibold text-text-title">Total</span>
          <div className="text-right">
            {totals.savings > 0 && (
              <span className="text-sm text-text-muted line-through mr-2">
                {formatPrice(totals.subtotal + totals.savings)}
              </span>
            )}
            <span className="text-2xl font-gilroy-bold text-text-title">
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>
        {totals.savings > 0 && (
          <div className="text-right text-sm text-accent-green font-gilroy-medium">
            You save {formatPrice(totals.savings)}
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <Button onClick={handleCheckout} className="w-full mb-3">
        Checkout
      </Button>

      {/* Save for later */}
      <button
        onClick={handleSaveSystem}
        className="w-full text-center text-sm text-text-muted hover:text-primary transition-colors duration-200 font-gilroy-medium"
      >
        Save my system for later
      </button>
    </div>
  );
}