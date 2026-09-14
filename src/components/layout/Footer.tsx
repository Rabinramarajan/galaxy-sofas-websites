import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { site } from "@/constants/site";
import { footerProductLinks, mainNav } from "@/data/navigation";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-cream">
      <Container className="grid grid-cols-1 gap-10 py-12 min-[400px]:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-8 lg:py-20">
        <div>
          <Link href="/" aria-label={site.name} className="inline-flex cursor-pointer items-center">
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={150}
              height={44}
              className="h-10 w-auto"
              sizes="150px"
              unoptimized
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Custom sofas, recliners, sofa cum beds and sofa repair services, made and serviced in
            {" "}{site.city}.
          </p>
          <div className="mt-6 flex gap-2">
            {/* Rendered only when the profiles are confirmed real (site.socialVerified). */}
            {site.socialVerified ? (
              <>
            <a
              href={site.social.instagram}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-dark transition-colors duration-200 hover:text-primary"
              aria-label="Galaxy Sofas on Instagram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.social.facebook}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-dark transition-colors duration-200 hover:text-primary"
              aria-label="Galaxy Sofas on Facebook"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FacebookIcon />
            </a>
              </>
            ) : null}
          </div>
        </div>

        <div>
          <p className="text-sm text-dark">Quick Links</p>
          <ul className="mt-5 space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-sm transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-dark">Sofa types</p>
          <ul className="mt-5 space-y-2.5">
            {footerProductLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-sm transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-dark">Contact</p>
          <address className="mt-5 not-italic">
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={site.phoneHref} className="cursor-pointer hover:text-primary">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="break-all cursor-pointer hover:text-primary"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.location}, {site.country}</li>
            </ul>
          </address>
        </div>
      </Container>
      <div className="border-t border-line py-5 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] md:pb-5">
        <Container>
          <p className="text-center text-sm">© {site.name}. All Rights Reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
