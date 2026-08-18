import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
};

const styles = {
  primary:
    "bg-charcoal text-parchment hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-linen",
  ghost: "text-charcoal underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
  external,
}: Props) {
  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200",
    styles[variant],
    className,
  );

  if (href) {
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
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
