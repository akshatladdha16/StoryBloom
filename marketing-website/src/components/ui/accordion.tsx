"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

type Item = {
  value: string;
  question: string;
  answer: string;
  testId: string;
};

type StoryAccordionProps = {
  items: Item[];
};

export function StoryAccordion({ items }: StoryAccordionProps) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="space-y-4">
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          className="tactile-shadow-sm overflow-hidden rounded-2xl bg-canvas"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              data-testid={item.testId}
              className="focus-ring group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-slate-900"
            >
              <span>{item.question}</span>
              <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="px-6 pb-5 text-base text-slate-700">
            {item.answer}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
