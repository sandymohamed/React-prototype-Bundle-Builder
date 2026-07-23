import React from "react";
import { cn } from "../../utils/cn";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  CameraIcon,
  SensorIcon,
  PlanIcon,
  AccessoryIcon,
} from './Icons'; 

const ICONS = {
  'chevron-up': ChevronUpIcon,
  'chevron-down': ChevronDownIcon,
  'minus': MinusIcon,
  'plus': PlusIcon,
  'camera': CameraIcon,
  'sensor': SensorIcon,
  'plan': PlanIcon,
  'accessory': AccessoryIcon,
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
  color?: string;
}

export function Icon({
  name,
  size = 20,
  className,
  color = "currentColor",
  ...props
}: IconProps) {
  const SvgIcon = ICONS[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <SvgIcon
      width={size}
      height={size}
      className={cn("flex-shrink-0", className)}
      style={{ color }}
      {...props}
    />
  );
}

export {
  ChevronUpIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  CameraIcon,
  SensorIcon,
  PlanIcon,
  AccessoryIcon,
};