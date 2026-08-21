"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/sofas", label: "Sofas" },
  { href: "/beds", label: "Beds" },
  { href: "/furniture", label: "Furniture" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || open ? "border-border bg-parchment/95 backdrop-blur-sm" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex min-h-[4.75rem] items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className={cn(
            "shrink-0 font-display text-xl tracking-tight transition-colors sm:text-2xl",
            overHero ? "text-parchment" : "text-charcoal",
          )}
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 xl:flex xl:gap-7" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-xs uppercase tracking-[0.2em] transition-colors",
                  overHero
                    ? active
                      ? "text-sand"
                      : "text-parchment/80 hover:text-parchment"
                    : active
                      ? "text-walnut"
                      : "text-charcoal/80 hover:text-charcoal",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button href="/contact" variant={overHero ? "inverse" : "primary"} className="hidden sm:inline-flex">
            Enquire Now
          </Button>
          <button
            type="button"
            className={cn(
              "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center xl:hidden",
              overHero ? "text-parchment" : "text-charcoal",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>
      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-border bg-parchment xl:hidden"
        >
          <nav className="flex flex-col px-5 py-4 sm:px-8" aria-label="Mobile">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center border-b border-border/70 text-sm tracking-[0.16em] uppercase",
                    active && "text-walnut",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-5">
              <Button href="/contact" className="w-full">
                Enquire Now
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
