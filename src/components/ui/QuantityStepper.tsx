import { cn } from "../../utils/cn";
import { Icon } from "./Icon";

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
  disabled = false,
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
          "w-[20px] h-[20px] rounded-4  border-[2px] border-[#E6EBF0] color-[#CED6DE] flex items-center justify-center",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-primary-light",
        )}
        aria-label="Decrease quantity"
      >
       <Icon name="minus" />
      </button>
      <span className="w-8 text-center font-gilroy-medium text-text-title">
        {value}
      </span>
      <button
        onClick={increment}
        disabled={disabled || value >= max}
       className={cn(
          "w-[20px] h-[20px] rounded-4 bg-[#F0F4F7] color-[#525963] flex items-center justify-center",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-primary-light",
        )}
        aria-label="Increase quantity"
      >
          <Icon name="plus" />
      </button>
    </div>
  );
}
