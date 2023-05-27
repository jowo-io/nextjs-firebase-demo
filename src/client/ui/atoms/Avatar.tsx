import React, { HTMLAttributes } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const avatar = cva(
  [
    "inline-block",
    "flex",
    "justify-center",
    "items-center",
    "rounded-full",
    "overflow-hidden",
    "aspect-square",
    "bg-white",
  ],
  {
    variants: {
      size: {
        sm: [],
        md: [],
        lg: [],
        xl: [],
        full: ["max-w-full", "w-full", "h-full"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      size: "md",
    },
  }
);

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 64,
  full: 640,
};

export interface Props
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof avatar> {
  src?: string | null;
  alt?: string | null;
}

export default function Avatar({ className, size, src, alt, ...props }: Props) {
  const pxSize = size ? sizes[size] : undefined;
  return (
    <div
      style={{
        width: pxSize ? `${pxSize}px` : undefined,
        height: pxSize ? `${pxSize}px` : undefined,
      }}
      className={avatar({ size, className })}
      {...props}
    >
      <Image
        width={pxSize}
        height={pxSize}
        src={src || "/fallback-avatar.png"}
        alt={alt || "Avatar"}
        className={cx("block", "object-cover")}
      />
    </div>
  );
}
