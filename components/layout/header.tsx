"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { IconClose, IconMenu } from "@/components/ui/icons";
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

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled || open ? "border-b border-border bg-parchment/95 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-2xl tracking-tight text-charcoal">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] transition-colors",
                  active ? "text-walnut" : "text-charcoal/80 hover:text-charcoal",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/contact">Enquire Now</Button>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-menu" className="border-t border-border bg-parchment lg:hidden">
          <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-12 border-b border-border/70 py-3 text-sm tracking-[0.16em] uppercase"
              >
                {link.label}
              </Link>
            ))}
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
