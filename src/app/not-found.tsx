import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { site } from "@/constants/site";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "Page not found",
  // Kept out of the index with a meta tag, not via robots.txt.
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Sofa collection", href: "/products/" },
  { label: "L shape sofas", href: "/products/l-shape/" },
  { label: "Custom sofas", href: "/products/custom/" },
  { label: "Sofa services", href: "/services/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/contact/" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center sm:py-20">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-3 font-serif text-[1.75rem] text-dark sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md">
        This page is not available. The links below cover everything on the site, or send us a
        WhatsApp message and we will point you to the right place.
      </p>
      <div className="action-stack mt-8 sm:justify-center">
        <Button href="/">Back to home</Button>
        <WhatsAppButton
          message={getGeneralEnquiryMessage()}
          label="WhatsApp us"
          variant="outline"
        />
      </div>
      <nav aria-label="Popular pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="cursor-pointer text-primary hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-8 text-sm">
        Or call{" "}
        <a href={site.phoneHref} className="cursor-pointer text-primary hover:underline">
          {site.phoneDisplay}
        </a>
        .
      </p>
    </Container>
  );
}
