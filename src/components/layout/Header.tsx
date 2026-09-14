"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { site } from "@/constants/site";
import { headerNav } from "@/data/navigation";
import { isActivePath } from "@/utils/navigation";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-cream transition-[box-shadow] duration-200 ${
          scrolled ? "shadow-[0_1px_0_rgb(23_23_23_/_0.08)]" : ""
        }`}
      >
        <Container className="flex h-16 min-w-0 items-center justify-between gap-3 sm:h-[4.75rem] sm:gap-4">
          <Link
            href="/"
            aria-label={site.name}
            className="flex min-w-0 shrink cursor-pointer items-center overflow-hidden rounded-md"
          >
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={320}
              height={96}
              className="h-9 w-auto max-w-[160px] sm:h-11 sm:max-w-none"
              sizes="(max-width: 640px) 160px, 220px"
              unoptimized
              priority
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {headerNav.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`cursor-pointer border-b py-1 text-sm tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-dark hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <span className="hidden sm:inline-flex">
              <Button href="/contact/" className="px-4">
                Get Free Quote
              </Button>
            </span>
            <button
              type="button"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-dark lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
