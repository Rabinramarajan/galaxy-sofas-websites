import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

type BreadcrumbsProps = {
  /** Ancestors only — the current page is passed separately as `current`. */
  trail: Crumb[];
  current: string;
  className?: string;
};

/**
 * Visible breadcrumb trail built from real crawlable links.
 * Pair with `breadcrumbSchema()` so the markup and the JSON-LD always agree.
 */
export function Breadcrumbs({ trail, current, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem] text-foreground">
        {trail.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            <Link href={crumb.path} className="cursor-pointer hover:text-primary">
              {crumb.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-line" aria-hidden="true" />
          </li>
        ))}
        <li className="text-dark" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
