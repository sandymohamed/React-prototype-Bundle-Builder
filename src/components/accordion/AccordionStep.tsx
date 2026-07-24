import React from "react";
import { cn } from "../../utils/cn";
import { useResponsive } from "../../hooks/useResponsive";
import { Icon } from "../ui/Icon";

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  nextStepTitle: string | null;
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
  nextStepTitle,
  category,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  children,
}: AccordionStepProps) {
  const { isMobile } = useResponsive();
  console.log(
    `  stepNumber,
  totalSteps,
  title,
  category,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  children,` + stepNumber,
    totalSteps,
    title,
    category,
    isOpen,
    selectedCount,
    onToggle,
    onNext,
    children,
  );
  return (
    <div
      className={cn(
        " overflow-hidden transition-all duration-200",
        "pt-5 pb-5 px-[15px]",
        "w-full",
        "opacity-100",
    isOpen ? " " :     " border-[#1F1F1F] border-t-[0.5px] border-b-[0.5px]",
      ) }
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between rounded-lg px-1 "
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

      {isOpen && (
        <div className="animate-slide-down space-y-[15px] flex flex-col items-center justify-between">
          {children}

          {onNext && (
            <button
              onClick={onNext}
              className="mt-4 px-6 py-2 w-full sm:w-auto 
              border-[1px] border-accent-blue rounded-7 
              bg-[transparent] text-accent-blue  text-lg  
              slide-down
            focus:bg-slate-300 "
            >
              Next: {nextStepTitle}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
