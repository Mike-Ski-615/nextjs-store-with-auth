"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideIcon } from "lucide-react";

interface MenuButtonProps {
  type?: "button" | "dropdown" | "popover" | "toggle-group-item";
  children?: React.ReactNode;
  icon?: LucideIcon;
  text?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  value?: string; // for ToggleGroupItem
  disabled?: boolean;
}

export function MenuButton({
  type = "button",
  children,
  icon: Icon,
  text,
  pressed,
  onPressedChange,
  variant = "outline",
  size = "sm",
  value,
  disabled,
}: MenuButtonProps) {
  // ToggleGroupItem 类型
  if (type === "toggle-group-item") {
    return (
      <ToggleGroupItem value={value || ""} variant={variant} size={size}>
        {Icon && <Icon />}
        {text}
      </ToggleGroupItem>
    );
  }

  // 普通 Toggle
  const toggleContent = (
    <Toggle
      variant={variant}
      size={size}
      pressed={pressed}
      onPressedChange={onPressedChange}
      className="gap-2"
      disabled={disabled}
    >
      {Icon && <Icon />}
      {text}
    </Toggle>
  );

  if (type === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{toggleContent}</DropdownMenuTrigger>
        <DropdownMenuContent align="start">{children}</DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (type === "popover") {
    return (
      <Popover>
        <PopoverTrigger asChild>{toggleContent}</PopoverTrigger>
        <PopoverContent align="start" className="w-auto">
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return toggleContent;
}
