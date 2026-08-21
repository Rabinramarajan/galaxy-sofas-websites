import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "inverse" | "onDark";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  external?: boolean;
};

const styles = {
  primary:
    "bg-charcoal text-parchment hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-linen disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "border border-walnut/40 bg-transparent text-charcoal hover:border-walnut hover:bg-linen disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "text-charcoal underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-danger text-parchment hover:bg-danger/90 disabled:opacity-50 disabled:cursor-not-allowed",
  inverse:
    "bg-parchment text-charcoal hover:bg-linen disabled:opacity-50 disabled:cursor-not-allowed",
  onDark:
    "border border-parchment/60 bg-transparent text-parchment hover:border-parchment hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  loading,
  onClick,
  external,
}: Props) {
  const isDisabled = disabled || loading;
  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200",
    styles[variant],
    className,
  );

  if (href && !isDisabled) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={isDisabled} aria-busy={loading || undefined} onClick={onClick}>
      {children}
    </button>
  );
}
