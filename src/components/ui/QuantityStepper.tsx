// src/components/ui/QuantityStepper.tsx
import React from 'react';
// import { Minus, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityStepper({ 
  value, 
  onChange, 
  min = 0, 
  max = 99,
  disabled = false 
}: QuantityStepperProps) {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        disabled={disabled || value <= min}
        className={cn(
          "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center",
          "hover:bg-gray-50 transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-primary-light"
        )}
        aria-label="Decrease quantity"
      >
     Minus   {/* <Minus className="w-4 h-4" /> */}
      </button>
      <span className="w-8 text-center font-gilroy-medium text-text-title">
        {value}
      </span>
      <button
        onClick={increment}
        disabled={disabled || value >= max}
        className={cn(
          "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center",
          "hover:bg-gray-50 transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-primary-light"
        )}
        aria-label="Increase quantity"
      >
     Plus   {/* <Plus className="w-4 h-4" /> */}
      </button>
    </div>
  );
}