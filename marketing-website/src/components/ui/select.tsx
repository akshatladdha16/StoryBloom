"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
  testId: string;
};

type StorySelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: Option[];
  triggerTestId: string;
};

export function StorySelect({
  value,
  onValueChange,
  placeholder,
  options,
  triggerTestId,
}: StorySelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        data-testid={triggerTestId}
        className="focus-ring inline-flex h-[58px] w-full items-center justify-between rounded-2xl border-2 border-ink bg-white px-5 text-left text-lg font-semibold text-slate-900"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-5 w-5 text-slate-700" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={8}
          className="z-50 min-w-[180px] overflow-hidden rounded-2xl border-2 border-ink bg-canvas p-1"
        >
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                data-testid={option.testId}
                className="relative flex cursor-pointer items-center rounded-xl px-10 py-2.5 text-base font-semibold text-slate-900 outline-none focus:bg-canvas-alt"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-3">
                  <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
