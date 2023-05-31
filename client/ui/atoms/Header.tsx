import React, { ReactNode, HTMLAttributes } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

const defaultTag = "h1";

const header = cva(
  ["my-0", "max-w-full", "font-bold", "leading-normal", "font-header"],
  {
    variants: {
      tag: {
        h1: ["text-3xl"],
        h2: ["text-2xl"],
        h3: ["text-xl"],
        h4: ["text-lg"],
        h5: ["text-base"],
        h6: ["text-sm"],
      },
      color: {
        white: "text-black dark:text-white",
        black: "text-black",
      },
    },
    defaultVariants: {
      tag: defaultTag,
      color: "white",
    },
  }
);

const margins = {
  h1: "mb-6",
  h2: "mb-4",
  h3: "mb-4",
  h4: "mb-2",
  h5: "mb-2",
  h6: "mb-1",
};

export interface Props
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof header> {
  options?: ReactNode;
}

export default function Header({
  tag,
  color,
  children,
  className,
  options,
  ...props
}: Props) {
  const Tag = tag || defaultTag;
  return (
    <div
      className={cx(
        "flex",
        "w-full",
        "items-center",
        "justify-between",
        margins[Tag],
        className
      )}
      {...props}
    >
      <Tag className={header({ tag, color })}>{children}</Tag>
      {options && (
        <div className={cx("flex", "items-center", "justify-center")}>
          {options}
        </div>
      )}
    </div>
  );
}
