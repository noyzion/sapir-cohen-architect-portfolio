import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "sm";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  fullWidth?: boolean;
  size?: Size;
};

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  fullWidth?: boolean;
  size?: Size;
};

function classes(variant: Variant, fullWidth?: boolean, size?: Size) {
  return [
    variantClass[variant],
    fullWidth && "btn-full",
    size === "sm" && "!px-5 !py-2.5 !text-[0.625rem]",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  fullWidth,
  size,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${classes(variant, fullWidth, size)} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  fullWidth,
  size,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`${classes(variant, fullWidth, size)} ${className}`}
      {...props}
    />
  );
}
