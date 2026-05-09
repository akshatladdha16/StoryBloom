"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

type StorySwitchProps = {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  id: string;
  testId: string;
};

export function StorySwitch({
  checked,
  onCheckedChange,
  id,
  testId,
}: StorySwitchProps) {
  return (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      data-testid={testId}
      className="focus-ring relative inline-flex h-8 w-14 items-center rounded-full border-2 border-ink bg-white transition-colors data-[state=checked]:bg-primary"
    >
      <SwitchPrimitive.Thumb className="block h-6 w-6 translate-x-0.5 rounded-full border-2 border-ink bg-canvas transition-transform data-[state=checked]:translate-x-[1.45rem]" />
    </SwitchPrimitive.Root>
  );
}
