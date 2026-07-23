import React from "react";
import { cn } from "../../utils/cn";
import { useResponsive } from "../../hooks/useResponsive";
import { Icon } from "../ui/Icon";

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  category:
    | "chevron-up"
    | "chevron-down"
    | "minus"
    | "plus"
    | "camera"
    | "sensor"
    | "plan"
    | "accessory";
  isOpen: boolean;
  selectedCount: number;
  totalItems: number;
  onToggle: () => void;
  onNext?: () => void;
  children: React.ReactNode;
}

export function AccordionStep({
  stepNumber,
  totalSteps,
  title,
  category,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  children,
}: AccordionStepProps) {
  const { isMobile } = useResponsive();

  return (
    <div
      className={cn(
        "bg-paper overflow-hidden transition-all duration-200",
        "border-t border-[#1F1F1F]",
        "border-t-[0.5px]",
        "pt-5 pb-5 px-[15px]",
        "w-full",
        "opacity-100",
      )}
    >
      {/* Header - with hover state */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between rounded-lg px-1 pb-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <Icon name={category} />
          <span
            className="font-gilroy-semibold text-text-title"
            style={{
              fontFamily: "Gilroy-SemiBold, sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? "18px" : "22px",
              lineHeight: "100%",
              letterSpacing: "0px",
              color: "#0B0D10",
              background: "#0B0D10",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isOpen && selectedCount > 0 && (
            <span className="text-sm font-gilroy-medium text-primary">
              {selectedCount} selected
            </span>
          )}
          {isOpen ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />}
        </div>
      </button>

      {/* Content - with gap 15px from Figma */}
      {isOpen && (
        <div className="animate-slide-down space-y-[15px]">
          {children}

          {onNext && (
            <button
              onClick={onNext}
              className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-gilroy-semibold rounded-xl 
                       hover:bg-primary-dark transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
            >
              Next:{" "}
              {stepNumber < totalSteps ? `Step ${stepNumber + 1}` : "Finish"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
