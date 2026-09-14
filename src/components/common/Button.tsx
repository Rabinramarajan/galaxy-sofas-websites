import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "inverse" | "ghost";

/**
 * One variant per surface. Do NOT recolour a variant through `className` —
 * Tailwind resolves conflicting utilities (border-primary/40 vs border-white/70)
 * by stylesheet order, not by the order they appear in the class attribute, so
 * an override silently loses. `className` is for layout and sizing only.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-dark text-white hover:bg-black",
  outline:
    "border border-primary/40 text-primary bg-transparent hover:border-primary hover:bg-primary hover:text-white",
  /** Outline for dark surfaces — the hero and the dark CTA band. */
  inverse:
    "border border-white/70 text-white bg-transparent hover:border-white hover:bg-white hover:text-dark focus-visible:outline-white",
  ghost: "text-dark hover:text-primary bg-transparent px-0",
};

const baseClasses =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 touch-manipulation disabled:cursor-not-allowed disabled:opacity-60";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "onClick"> & {
    href?: string;
    external?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  };

export function Button({
  children,
  className = "",
  variant = "primary",
  href,
  external,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
