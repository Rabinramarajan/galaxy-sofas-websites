import Link from "next/link";
import { site } from "@/lib/site";
import { primaryCategories } from "@/data/categories";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rail mt-auto border-t border-border bg-linen">
      <Container className="grid gap-10 py-16 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="max-w-sm lg:pr-4">
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A furniture showroom in {site.city} for sofas, beds and home furnishings made with considered
            materials and a quiet, lasting style.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="secondary">
              Visit or enquire
            </Button>
          </div>
        </div>
        <div>
          <p className="eyebrow">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryCategories.map((category) => (
              <li key={category.slug}>
                <Link className="hover:text-walnut" href={category.href}>
                  Explore our {category.name.toLowerCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-walnut" href="/collections">
                Browse collections
              </Link>
            </li>
            <li>
              <Link className="hover:text-walnut" href="/guides">
                Furniture buying guides
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-walnut" href="/about">
                About {site.name}
              </Link>
            </li>
            <li>
              <Link className="hover:text-walnut" href="/contact">
                Contact the showroom
              </Link>
            </li>
            <li>
              <Link className="hover:text-walnut" href="/faq">
                Frequently asked questions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Showroom</p>
          <address className="mt-4 space-y-2 text-sm not-italic text-muted">
            <p>
              {site.addressLine}
              <br />
              {site.city}, {site.region} {site.postalCode}
            </p>
            <p>
              <a className="text-charcoal hover:text-walnut" href={`tel:${site.phoneE164}`}>
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="text-charcoal hover:text-walnut" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            {site.hours.map((item) => (
              <p key={item.days}>
                {item.days}: {item.time}
              </p>
            ))}
          </address>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={site.social.instagram} className="transition-colors hover:text-walnut" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.social.facebook} className="hover:text-walnut" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={site.social.pinterest} className="hover:text-walnut" target="_blank" rel="noopener noreferrer">
              Pinterest
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy-policy" className="hover:text-charcoal">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-charcoal">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
