import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["flex", "justify-center", "items-center"], {
  variants: {
    intent: {
      primary: [
        "bg-primary",
        "text-secondary",
        "border-black",
        "hover:bg-primary-dark",
      ],
      secondary: [
        "bg-secondary",
        "text-primary",
        "border-black",
        "hover:bg-secondary-dark",
      ],
    },
    size: {
      sm: ["text-sm", "rounded-md", "py-2", "px-2", "h-8"],
      md: ["text-base", "rounded-lg", "py-2", "px-4", "h-12", "font-bold"],
      lg: ["text-xl", "rounded-lg", "py-2", "px-4", "h-16", "font-bold"],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

export interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({ className, intent, size, ...props }: Props) {
  return <button className={button({ intent, size, className })} {...props} />;
}
