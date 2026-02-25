"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuButtonProps {
  type: "button" | "dropdown" | "popover" | "toggle-group-item";
  children?: React.ReactNode;
  icon?: LucideIcon;
  text?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  value?: string;
  disabled?: boolean;
}

export function MenuButton({
  type,
  children,
  icon: Icon,
  text,
  pressed,
  onPressedChange,
  value,
  disabled,
}: MenuButtonProps) {
  const Content = (
    <>
      {Icon && <Icon />}
      {text}
    </>
  );

  const toggleContent = (
    <Toggle
      variant="outline"
      size="sm"
      pressed={pressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
    >
      {Content}
    </Toggle>
  );

  if (type === "toggle-group-item") {
    return (
      <ToggleGroupItem size="sm" value={value || ""}>
        {Content}
      </ToggleGroupItem>
    );
  }

  if (type === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{toggleContent}</DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (type === "popover") {
    return (
      <Popover>
        <PopoverTrigger asChild>{toggleContent}</PopoverTrigger>
        <PopoverContent className="w-auto">
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return toggleContent;
}
